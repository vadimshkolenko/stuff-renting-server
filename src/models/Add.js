const { DataTypes } = require('sequelize');
const { sequelize } = require('../libs/connection')
const User = require('./User')

const Add = sequelize.define('Add', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deposit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  },
});

Add.associate = (models) => {
  Add.belongsTo(models.User, {foreignKey: {name: 'userId', allowNull: false}})
  Add.hasMany(models.Image, {foreignKey: 'addId'})
}

module.exports = Add
