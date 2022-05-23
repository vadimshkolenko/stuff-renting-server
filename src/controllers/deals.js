const Deal = require('../models/Deal')
const Notification = require("../models/Notification");
const { makePaymentToUser, getUserPhoneById } = require('../utils')
const { dealStatus } = require('../constants')
require('dotenv').config()

const createDeal = async (ctx) => {
  const { dateStart, dateEnd, AddId, renterId, price, deposit, landlordId, name } = ctx.request.body
  await Deal.create({
    dateStart,
    dateEnd,
    AddId,
    renterId,
    landlordId,
    price,
    deposit,
    status: dealStatus.WAIT_RESPONSE,
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
  const { dealId, newStatus } = ctx.request.body

  const deal = await Deal.findOne({ where: { id: dealId }, raw: true } )
  const { price, deposit, landlordId, renterId } = deal

  // TODO remove test phone on prod
  if (newStatus === dealStatus.ACTIVE) {
    const phone = await getUserPhoneById(landlordId)
    await makePaymentToUser(
      price,
      process.env.NODE_ENV === 'test' ?
        process.env.TEST_PHONE_NUMBER :
        phone
    )
  } else if (newStatus === dealStatus.COMPLETED) {
    const phone = await getUserPhoneById(renterId)
    await makePaymentToUser(
      deposit,
      process.env.NODE_ENV === 'test' ?
        process.env.TEST_PHONE_NUMBER :
        phone
    )
  }

  await Deal.update({ status: newStatus }, { where: { id: dealId } });

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

const cancelDealRequest = async (ctx) => {
  const { id, role } = ctx.params

  const deal = await Deal.findOne({
    raw: true,
    where: { id }
  })

  await Deal.destroy({
    where: { id }
  });

  // sending cancel notification to renter
  if (role === 'landlord') {
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
