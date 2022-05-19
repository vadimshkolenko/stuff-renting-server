const Koa = require('koa')
const cors = require('@koa/cors')
const dotenv = require('dotenv')
const { v4: uuid } = require('uuid')
const serve = require('koa-static')
const Session = require('./models/Session')
const routes = require('./routes')

dotenv.config({path: '.env'})

const app = new Koa()

app.use(cors())
app.use(require('koa-bodyparser')())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('ERR', err)
    if (err.status) {
      ctx.status = err.status
      ctx.body = {error: err.message}
    } else {
      ctx.status = 500
      ctx.body = {error: 'Internal server error'}
    }
  }
})

app.use((ctx, next) => {
  ctx.login = async function(user) {
    const token = uuid()
    await Session.create({token, UserId: user.id, lastVisit: new Date()});

    return token;
  };

  return next();
});

app.use(serve('./public'))

app.use(routes)

module.exports = app
