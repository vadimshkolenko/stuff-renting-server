const Favorite = require("../models/Favorite");
const Ad = require('../models/Ad')
const { Op } = require('sequelize');
const Image = require("../models/Image");

const addToFavorite = async (ctx) => {
  const { adId, UserId } = ctx.request.body

  const favorite = await Favorite.findOne({ raw: true, where: { UserId } })
  favorite.ads.push(adId)

  Favorite.update({ads: favorite.ads}, {where: { UserId }})

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

const deleteFromFavorite = async (ctx) => {
  const { adId, UserId } = ctx.request.body

  const favorite = await Favorite.findOne({ raw: true, where: { UserId } })

  Favorite.update({ads: favorite.ads.filter(id => +id !== +adId)}, {where: { UserId }})

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

const getFavorite = async (ctx) => {
  const { UserId } = ctx.params

  const favorite = await Favorite.findOne({ raw: true, where: { UserId } })

  const ads = await Ad.findAll({
    where: {
      id: {
        [Op.in]: favorite.ads,
      },
    },
    include: Image
  })

  ctx.status = 200
  ctx.body = {status: 'ok', data: ads}
}

const checkIsFavorite = async (ctx) => {
  const { UserId, adId } = ctx.params

  const favorite = await Favorite.findOne({ raw: true, where: { UserId } })
  const isFavorite = favorite.ads.includes(adId)

  ctx.status = 200
  ctx.body = {status: 'ok', isFavorite}
}

module.exports = { getFavorite, addToFavorite, deleteFromFavorite, checkIsFavorite }
