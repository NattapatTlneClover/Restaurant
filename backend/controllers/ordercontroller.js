const sequelize = require('../config/database');
const Order = require('../models/orders');
const OrderItem = require('../models/order_item');
const MenuItem = require('../models/menuitem');
const OrderGroup = require('../models/order_group');
const { getIO } = require('../config/socket');



exports.createOrder = async (req, res, next) => {
  console.log('req.body:', req.body);
  let { tableId, items } = req.body;

  if (typeof items === 'string') {
    try {
      items = JSON.parse(items);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON format for items' });
    }
  }

  tableId = Number(tableId);
  if (isNaN(tableId)) return res.status(400).json({ error: 'tableId must be a number' });

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items must be a non-empty array' });
  }

  const t = await sequelize.transaction();

  try {
    let totalPrice = 0;
    const orderItemsData = [];

    // หาหรือสร้าง order_group active ของโต๊ะนี้
    let orderGroup = await OrderGroup.findOne({
      where: { table_id: tableId, status: 'active' },
      transaction: t,
    });

    if (!orderGroup) {
      orderGroup = await OrderGroup.create(
        { table_id: tableId, status: 'active' },
        { transaction: t }
      );
    }

    // วนตรวจสอบ items พร้อมคำนวณราคา
    for (const item of items) {
      if (!item.menuItemId || !item.quantity) {
        await t.rollback();
        return res.status(400).json({ error: 'Invalid item in items array' });
      }

      const menuItem = await MenuItem.findByPk(item.menuItemId, { transaction: t });
      if (!menuItem) {
        await t.rollback();
        return res.status(404).json({ error: `MenuItem ID ${item.menuItemId} not found` });
      }

      totalPrice += menuItem.price * item.quantity;

      orderItemsData.push({
        menu_item_id: menuItem.id,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    if (totalPrice <= 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Total price must be greater than zero' });
    }

    // สร้าง order โดยผูกกับ orderGroup
    const order = await Order.create(
      {
        table_id: tableId,
        order_group_id: orderGroup.id,
        total_price: totalPrice,
        status: 'pending',
      },
      { transaction: t }
    );

    // สร้าง order_items
    await Promise.all(
      orderItemsData.map(itemData =>
        OrderItem.create({ ...itemData, order_id: order.id }, { transaction: t })
      )
    );

    await t.commit();

    const result = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          include: [MenuItem],
        },
      ],
    });

    const io = getIO();
    io.emit('orderCreated', result);

    res.status(201).json(result);
  } catch (err) {
    try {
      if (!t.finished) await t.rollback();
    } catch (rollbackErr) {
      console.error('Rollback error:', rollbackErr);
    }
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: OrderItem,
        include: [MenuItem]   // ดึงข้อมูล menu item ในแต่ละ orderItem ด้วย
      }]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [OrderItem]
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByGroup = async (req, res) => {
  try {
    const { orderGroupId } = req.params;

    if (!orderGroupId) {
      return res.status(400).json({ message: 'Missing orderGroupId' });
    }

    // ตรวจสอบว่า order group ยัง active อยู่ไหม
    const orderGroup = await OrderGroup.findOne({
      where: { id: orderGroupId, status: 'active' },
    });

    if (!orderGroup) {
      return res.status(404).json({ message: 'Order group not found or closed' });
    }

    // ดึง orders ทั้งหมดของ order group พร้อม order items และ menu item
    const orders = await Order.findAll({
      where: { order_group_id: orderGroupId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: MenuItem,
            },
          ],
        },
      ],
    });

    return res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by group:', error);
    return res.status(500).json({ message: 'Failed to get orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  console.log('Update order id:', id);
  console.log('Status from body:', status);

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    const updatedOrder = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          include: [MenuItem]
        }
      ]
    });

    const io = getIO();
    io.emit('orderUpdated', updatedOrder); // ส่ง event แจ้ง client ทุกคน
    console.log('Emitting orderUpdated event for order id:', id);
    res.json({ message: 'Status updated successfully', order: updatedOrder });
  } catch (err) {
    console.error('Error in updateOrderStatus:', err);
    res.status(500).json({ error: err.message });
  }
};

