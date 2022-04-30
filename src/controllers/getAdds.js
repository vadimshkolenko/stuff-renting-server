const Add = require('../models/Add')
const Image = require('../models/Image')

module.exports.getAdds = async (ctx) => {
  const data = await Add.findAll({include: Image});

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};
