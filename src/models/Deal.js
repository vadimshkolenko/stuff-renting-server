const { DataTypes, Model} = require('sequelize');
const { sequelize } = require('../libs/connection')
const Bill = require('../models/Bill')

class Deal extends Model {}

Deal.init( {
  dateStart: { type: DataTypes.DATE, allowNull: false },
  dateEnd: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  deposit: { type: DataTypes.INTEGER, allowNull: false },
  landlordId: { type: DataTypes.INTEGER },
  renterId: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'Deal' })

Deal.hasOne(Bill)
Bill.belongsTo(Deal)

module.exports = Deal
