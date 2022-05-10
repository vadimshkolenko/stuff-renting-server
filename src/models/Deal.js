const { DataTypes} = require('sequelize');
const { sequelize } = require('../libs/connection')

const Deal = sequelize.define('Deal', {
  dateStart: { type: DataTypes.DATE, allowNull: false },
  dateEnd: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  landlordId: { type: DataTypes.INTEGER },
  renterId: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Deal
