const Ad = require('../models/Ad')
const Image = require('../models/Image')

const adCreation = async (ctx) => {
  const images = ctx.request.files
  const { name, price, deposit, description, UserId, assessedValue } = ctx.request.body

  const ad = await Ad.create({
    UserId,
    name,
    price: Number(price),
    deposit: Number(deposit),
    description,
    assessedValue: Number(assessedValue)
  })
  const AdId = ad.id
  const updatedImages = images.map(image => ({...image, AdId}))
  await Image.bulkCreate(updatedImages)

  ctx.status = 200
  ctx.body = {status: 'ok'}
};

const updateAd = async (ctx) => {
  const { name, price, deposit, description, assessedValue, adId } = ctx.request.body

  // TODO add photos update
  await Ad.update({
    name,
    price: Number(price),
    deposit: Number(deposit),
    description,
    assessedValue: Number(assessedValue)
  }, { where: { id: adId } })

  ctx.status = 200
  ctx.body = {status: 'ok'}
};

const getAd = async (ctx) => {
  const { id } = ctx.params
  const data = await Ad.findOne({ where: {id}, include: {model: Image}})

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

const getAds = async (ctx) => {
  const data = await Ad.findAll({ include: Image });

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

const getUserAds = async (ctx) => {
  const { id } = ctx.params
  const data = await Ad.findAll({ where: {UserId: id}, include: Image });

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

module.exports = { adCreation, getAd, getAds, getUserAds, updateAd }
