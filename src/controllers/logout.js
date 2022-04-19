const Session = require('../models/Session');

module.exports.logout = async (ctx) => {
  const { token } = ctx.request.body

  console.log('TOKEN', token)

  await Session.destroy({
    where: { token }
  });

  ctx.status = 200
  ctx.body = {status: 'ok'}
};
