const axios = require("axios");
const config = require("../config");
const User = require("../models/User");

const makePaymentToUser = (amount, account) => {
  const transactionId = String(parseInt(new Date().getTime()/1000))
  return axios
    .post('https://edge.qiwi.com/sinap/api/v2/terms/99/payments', {
      id: transactionId,
      sum: { amount, currency: "643" },
      paymentMethod: { type: "Account", accountId: "643" },
      fields: { account }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.qiwi.token}`
      },
    })
}

const getUserPhoneById = async (id) => {
  const user = await User.findOne({ where: { id } })
  return user.phone
}

module.exports = { makePaymentToUser, getUserPhoneById }
