const Favorite = require("../models/Favorite");

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

  ctx.status = 200
  ctx.body = {status: 'ok', data: favorite.ads}
}

const checkIsFavorite = async (ctx) => {
  const { UserId, adId } = ctx.params

  const favorite = await Favorite.findOne({ raw: true, where: { UserId } })
  const isFavorite = favorite.ads.includes(adId)

  ctx.status = 200
  ctx.body = {status: 'ok', isFavorite}
}

module.exports = { getFavorite, addToFavorite, deleteFromFavorite, checkIsFavorite }
