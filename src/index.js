const app = require('./app');
const { sequelize }  = require('./libs/connection')

app.listen(8080, async () => {
  await sequelize.authenticate();
  // await sequelize.sync({force: true})
  // await sequelize.sync({alter: true})
  await sequelize.sync()

  console.log('App is running on http://localhost:8080')
})
