const Sequelize = require('sequelize');
const sequelize = require('../database');

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests',{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    isActive: Sequelize.BOOLEAN,
})

module.exports = ForgotPasswordRequests;