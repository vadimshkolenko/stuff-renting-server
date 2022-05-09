const Deal = require('../models/Deal')
const Add = require("../models/Add");
const User = require("../models/User");

module.exports.getDeals = async (ctx) => {
  const { role, id } = ctx.params
  const userRole = role === 'owner' ? 'landlordId' : 'renterId'
  // TODO get ad data
  const data = await Deal.findAll({ where: {[userRole]: id} });


  ctx.status = 200
  ctx.body = {status: 'ok', data}
};
