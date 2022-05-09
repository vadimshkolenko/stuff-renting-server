const { DataTypes, Model} = require('sequelize');
const { sequelize } = require('../libs/connection')
const Add = require('../models/Add')

class Deal extends Model {}

Deal.init( {
  dateStart: { type: DataTypes.DATE, allowNull: false },
  dateEnd: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  landlordId: { type: DataTypes.INTEGER },
  renterId: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'Deal' })

// Deal.hasOne(Add)

module.exports = Deal
