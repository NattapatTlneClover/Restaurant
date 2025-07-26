//Necessaries
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const Sequelize = require('sequelize');
const path = require('path');

//Models
const User = require('./models/user');
const Table = require('./models/table');
const MenuItem = require('./models/menuitem');
const Orders = require('./models/orders');
const OrderItems = require('./models/order_item');
const Reservation = require('./models/reservations');

//Routes
const tableRoutes = require('./routes/tableroutes');
const menuItemRoutes = require('./routes/menuitemroutes');
const orderRoutes = require('./routes/orderroutes');
const reservationRoutes = require('./routes/reservationroute');

//Setup
app.use(express.json()); //JSON body
app.use(express.urlencoded({ extended: true })); // สำหรับแปลง form-data / x-www-form-urlencoded

// Middlewares
app.use('/tables', tableRoutes);
app.use('/menu-items', menuItemRoutes);
app.use('/orders',orderRoutes);
app.use('/reservations',reservationRoutes);

// Multer configuration
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set headers for CORS

//Association
//Reservation->Table
Table.hasMany(Reservation, { foreignKey: 'table_id' });
Reservation.belongsTo(Table, { foreignKey: 'table_id' });

//order_item->orders
Orders.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });

// order_item->menu_item
MenuItem.hasMany(OrderItems, { foreignKey: 'menu_item_id' });
OrderItems.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });

// order->table
Orders.hasMany(Table, { foreignKey: 'table_id' });
Table.belongsTo(Orders, { foreignKey: 'table_id' });

// reservation->table
Table.hasMany(Reservation, { foreignKey: 'table_id' });
Reservation.belongsTo(Table, { foreignKey: 'table_id' });

//Sequelize sync
sequelize
    //.sync({ force: true })
    .sync()
    .then(result => {
        console.log("Sync Database Complete")
    })
    .catch(err => { console.log(err) });

//export
module.exports = app;