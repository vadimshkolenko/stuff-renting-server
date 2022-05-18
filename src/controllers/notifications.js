const Notification = require('../models/Notification')

module.exports.getNotifications = async (ctx) => {
  const { id } = ctx.params
  await Notification.update({ seen: true }, { where: { UserId: id }});
  const data = await Notification.findAll({where: { UserId: id }, order: [['createdAt', 'DESC']]})

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

module.exports.getCountOfUnreadNotifications = async (ctx) => {
  const { id } = ctx.params
  const count = await Notification.count({ where: { UserId: id, seen: false } })

  ctx.status = 200
  ctx.body = { status: 'ok', count }
};
