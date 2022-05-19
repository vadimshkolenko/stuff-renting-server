const Add = require('../models/Add')
const Image = require('../models/Image')

const addCreation = async (ctx) => {
  const images = ctx.request.files
  const { name, price, deposit, description, UserId, assessedValue } = ctx.request.body

  const add = await Add.create({
    UserId,
    name,
    price: Number(price),
    deposit: Number(deposit),
    description,
    assessedValue: Number(assessedValue)
  })
  const AddId = add.id
  const updatedImages = images.map(image => ({...image, AddId}))
  await Image.bulkCreate(updatedImages)

  ctx.status = 200
  ctx.body = {status: 'ok'}
};

const getAd = async (ctx) => {
  const { id } = ctx.params
  const data = await Add.findOne({ where: {id}, include: {model: Image}})

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

const getAdds = async (ctx) => {
  const data = await Add.findAll({ include: Image });

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};

module.exports = { addCreation, getAd, getAdds }
