const Deal = require('../models/Deal')

module.exports.createDeal = async (ctx) => {
  const {dateStart, dateEnd, AddId, renterId, price, landlordId} = ctx.request.body
  await Deal.create({dateStart, dateEnd, AddId, renterId, landlordId, price, status: 'WAIT_RESPONSE'})

  ctx.status = 200
  ctx.body = {status: 'ok'}
};
