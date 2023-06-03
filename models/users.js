const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    isPremiumUser: Sequelize.BOOLEAN
})

module.exports = User;