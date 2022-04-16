const app = require('./app');
const { testDBConnection }  = require('./libs/connection')

app.listen(8080, () => {
  console.log('App is running on http://localhost:8080')
})

testDBConnection()
