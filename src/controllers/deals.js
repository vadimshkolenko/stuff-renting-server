const Deal = require('../models/Deal')
const Notification = require("../models/Notification");

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
  const userRole = role === 'landlord' ? 'landlordId' : 'renterId'
  const data = await Deal.findAll({ where: {[userRole]: id}});

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

// TODO реализация уведомлений
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

const cancelDealRequest = async (ctx) => {
  const { id, typeOfDeal } = ctx.params

  const deal = await Deal.findOne({
    raw: true,
    where: { id }
  })

  await Deal.destroy({
    where: { id }
  });

  // sending cancel notification to renter
  if (typeOfDeal === 'landlordDeals') {
    await Notification.create({
      UserId: deal.renterId,
      text: `Запрос на аренду ${deal.name} был отклонен`,
      seen: false
    })
  }

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

module.exports = { changeDealStatus, createDeal, getDeals, cancelDealRequest }
