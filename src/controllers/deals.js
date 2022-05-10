const Deal = require('../models/Deal')

const createDeal = async (ctx) => {
  const {dateStart, dateEnd, AddId, renterId, price, landlordId, name} = ctx.request.body
  await Deal.create({
    dateStart,
    dateEnd,
    AddId,
    renterId,
    landlordId,
    price,
    status: 'WAIT_RESPONSE',
    name
  })

  ctx.status = 200
  ctx.body = {status: 'ok'}
};

const getDeals = async (ctx) => {
  const { role, id } = ctx.params
  const userRole = role === 'owner' ? 'landlordId' : 'renterId'
  const data = await Deal.findAll({ where: {[userRole]: id}});

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

const changeDealStatus = async (ctx) => {
  const { dealId, landlordId, newStatus } = ctx.request.body

  await Deal.update({ status: newStatus }, {
    where: {
      id: dealId,
      landlordId
    }
  });

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

// TODO реализация логики для арендодателя, доделать для арендатора
const cancelDealRequest = async (ctx) => {
  const { id } = ctx.params

  await Deal.destroy({
    where: { id }
  });

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

module.exports = { changeDealStatus, createDeal, getDeals, cancelDealRequest }
