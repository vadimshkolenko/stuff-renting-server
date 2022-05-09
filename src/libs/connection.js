const { Sequelize } = require('sequelize')
const config = require('../config');

const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = { sequelize }
