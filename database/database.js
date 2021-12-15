const sequelize = require('sequelize');

const connection = new sequelize('cafeteriaxyz', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;