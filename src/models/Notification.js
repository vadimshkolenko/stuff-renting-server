const { DataTypes} = require('sequelize');
const { sequelize } = require('../libs/connection')

const Notification = sequelize.define('Notification', {
  text: { type: DataTypes.TEXT, allowNull: false },
  seen: { type: DataTypes.BOOLEAN, allowNull: false },
});

module.exports = Notification
