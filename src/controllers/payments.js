const qiwiApi = require('../libs/qiwiApi')
const config = require('../config')
const Bill = require('../models/Bill')
const Deal = require("../models/Deal")
const { dealStatus } = require('../constants')

const createPaymentForm = async (ctx) => {
  const { dealId, amount } = ctx.params
  const billId = qiwiApi.generateId()
  const params = {
    publicKey: config.qiwi.publicKey,
    amount,
    billId,
    successUrl: `http://127.0.0.1/payment/success?billId=${billId}&dealId=${dealId}`
  };

  const link = qiwiApi.createPaymentForm(params)

  ctx.status = 200
  ctx.body = { status: 'ok', link }
}

const createBill = async (ctx) => {
  const { dealId: DealId, billId } = ctx.request.body
  await Bill.create({id: billId, DealId })

  await Deal.update({ status: dealStatus.WAIT_RECEIVING }, {
    where: {
      id: DealId,
    }
  })

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

const getBillInfo = async (ctx) => {
  const { billId } = ctx.params
  const data = await qiwiApi.getBillInfo(billId)

  ctx.status = 200
  ctx.body = {status: 'ok', data}
}

module.exports = { createPaymentForm, getBillInfo, createBill }
