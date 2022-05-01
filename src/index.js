const app = require('./app');
const { testDBConnection, sequelize }  = require('./libs/connection')

app.listen(8080, async () => {
  await sequelize.authenticate();
  console.log('App is running on http://localhost:8080')
})

// testDBConnection()
