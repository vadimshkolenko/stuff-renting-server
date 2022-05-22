const { DataTypes} = require('sequelize');
const { sequelize } = require('../libs/connection')

const Bill = sequelize.define('Bill', {
  id: {type: DataTypes.STRING, allowNull: false, primaryKey: true }
})

module.exports = Bill
