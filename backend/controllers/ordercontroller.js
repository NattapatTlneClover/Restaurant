const sequelize = require('../config/database');
const Order = require('../models/orders');
const OrderItem = require('../models/order_item');
const MenuItem = require('../models/menuitem');


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
  if (isNaN(tableId)) {
    return res.status(400).json({ error: 'tableId must be a number' });
  }

  const t = await sequelize.transaction();

  try {
    let totalPrice = 0;
    const orderItemsData = [];

    for (const item of items) {
      const menuItem = await MenuItem.findByPk(item.menuItemId);
      if (!menuItem) {
        await t.rollback();
        return res.status(404).json({ error: `MenuItem ID ${item.menuItemId} not found` });
      }

      totalPrice += menuItem.price * item.quantity;

      orderItemsData.push({
        menu_item_id: menuItem.id,  // ใช้ชื่อฟิลด์ตาม model นะ
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    if (totalPrice <= 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Total price must be greater than zero' });
    }

    const order = await Order.create(
      { table_id: tableId, total_price: totalPrice, status: 'pending' },
      { transaction: t }
    );

    await Promise.all(
      orderItemsData.map(itemData =>
        OrderItem.create({ ...itemData, order_id: order.id }, { transaction: t })
      )
    );

    await t.commit();

    // ดึงข้อมูลหลัง commit ออกมา query อีกที (ไม่อยู่ใน transaction)
    const result = await Order.findByPk(order.id, {
      include: [OrderItem],
    });

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
    const orders = await Order.findAll({ include: [OrderItem] });
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

