const {v4: uuid} = require('uuid')
const passport = require('../libs/passport')
const Add = require('../models/Add')

module.exports.getAdds = async (ctx) => {
  const data = await Add.findAll();

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};
