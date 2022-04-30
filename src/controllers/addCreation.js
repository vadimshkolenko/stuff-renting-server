const Add = require('../models/Add')
const Image = require('../models/Image')

module.exports.addCreation = async (ctx) => {
  const images = ctx.request.files
  const { name, price, deposit, description, userId } = ctx.request.body

  await Add.sync()
  const add = await Add.create({userId, name, price, deposit, description})
  const addId = add.id

  const updatedImages = images.map(image => ({...image, addId}))
  await Image.sync()
  await Image.bulkCreate(updatedImages)

  ctx.status = 200
  ctx.body = {status: 'ok'}
};
