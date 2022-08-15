const { DataTypes, Model} = require('sequelize');
const { sequelize } = require('../libs/connection')
const Image = require('../models/Image')
const Deal = require('../models/Deal')

class Ad extends Model {}

Ad.init( {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  deposit: { type: DataTypes.INTEGER, allowNull: true },
  assessedValue: { type: DataTypes.INTEGER, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'Ad' })

Ad.hasMany(Deal)
Ad.hasMany(Image)

module.exports = Ad
