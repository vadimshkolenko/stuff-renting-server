const { DataTypes } = require('sequelize');
const { sequelize } = require('../libs/connection')
const User = require('./User')

const Session = sequelize.define('Session', {
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastVisit: {
    type: DataTypes.DATE
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }
});

Session.associate = (models) => {
  // User
  Session.belongsTo(models.User, {foreignKey: {name: 'userId', allowNull: false}})
}

module.exports = Session
