const {v4: uuid} = require('uuid')
const passport = require('../libs/passport')
const Add = require('../models/Add')
const Session = require("../models/Session");

module.exports.addCreation = async (ctx) => {
  const { name, price, deposit, description, userId, images } = ctx.request.body

  await Add.sync()
  await Add.create({userId, name, price, deposit, description, images});

  ctx.status = 200
  ctx.body = {status: 'ok'}
};
