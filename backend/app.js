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

//Routes
const tableRoutes = require('./routes/tableroutes');
const menuItemRoutes = require('./routes/menuitemroutes');

//Setup
app.use(express.json()); 

// Middlewares
app.use('/tables', tableRoutes);
app.use('/menu-items',menuItemRoutes);

// Multer configuration
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set headers for CORS

//Association

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