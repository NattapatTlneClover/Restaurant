const Sequelize = require('sequelize');

const sequelize = new Sequelize('dbconnect','root','Frangken2001',{
    dialect:'mysql',
    host:'localhost',
    timezone: '+07:00'
});

module.exports = sequelize;