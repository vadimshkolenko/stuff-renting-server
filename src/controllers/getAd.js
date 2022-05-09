const Add = require('../models/Add')
const Image = require('../models/Image')

module.exports.getAd = async (ctx) => {
  const { id } = ctx.params
  const data = await Add.findOne({ where: {id}, include: {model: Image}})

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};
