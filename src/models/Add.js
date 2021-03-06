const { DataTypes, Model} = require('sequelize');
const { sequelize } = require('../libs/connection')
const Image = require('../models/Image')
const Deal = require('../models/Deal')

class Add extends Model {}

Add.init( {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  deposit: { type: DataTypes.INTEGER, allowNull: true },
  assessedValue: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'Add' })

Add.hasMany(Deal)
Add.hasMany(Image)

module.exports = Add
