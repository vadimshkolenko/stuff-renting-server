const { DataTypes, Model} = require('sequelize');
const { sequelize } = require('../libs/connection')

class Favorite extends Model {}

Favorite.init( {
 ads: DataTypes.ARRAY(DataTypes.DECIMAL)
}, { sequelize, modelName: 'Favorite' })

module.exports = Favorite
