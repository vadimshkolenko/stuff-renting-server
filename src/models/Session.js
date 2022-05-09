const { DataTypes } = require('sequelize');
const { sequelize } = require('../libs/connection')

const Session = sequelize.define('Session', {
  token: { type: DataTypes.STRING, allowNull: false },
  lastVisit: { type: DataTypes.DATE },
});

module.exports = Session
