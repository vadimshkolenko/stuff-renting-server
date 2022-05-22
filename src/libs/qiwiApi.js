const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk')
require('dotenv').config()

const SECRET_KEY = process.env.QIWI_SECRET_KEY

const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY)

module.exports = qiwiApi
