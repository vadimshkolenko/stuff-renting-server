const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const dotenv = require('dotenv')
const { v4: uuid } = require('uuid');
const { register, confirm } = require('./controllers/registration')
const { login } = require('./controllers/login')
const { logout } = require('./controllers/logout')
const { addCreation } = require('./controllers/addCreation')
const { getAdds } = require('./controllers/getAdds')
const handleValidationError = require('./middleware/validationErrors')
const Session = require('./models/Session')

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
    await Session.sync()
    await Session.create({token, userId: user.id, lastVisit: new Date()});

    return token;
  };

  return next();
});

const router = new Router({prefix: '/api'})

router.post('/register', handleValidationError, register)
router.post('/confirm', handleValidationError, confirm)
router.post('/login', handleValidationError, login);
router.post('/logout', handleValidationError, logout);
router.post('/createAdd', handleValidationError, addCreation);
router.get('/getAdds', handleValidationError, getAdds);

app.use(router.routes())

module.exports = app
