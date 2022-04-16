const { Sequelize } = require('sequelize')
const config = require('../config');

const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: 'localhost',
  dialect: 'postgres'
})

// sequelize.sync()

const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, testDBConnection }
