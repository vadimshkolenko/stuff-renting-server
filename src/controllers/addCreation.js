const Add = require('../models/Add')
const Image = require('../models/Image')

module.exports.addCreation = async (ctx) => {
  const images = ctx.request.files
  const { name, price, deposit, description, UserId, assessedValue } = ctx.request.body

  const add = await Add.create({UserId, name, price, deposit, description, assessedValue})
  const AddId = add.id
  const updatedImages = images.map(image => ({...image, AddId}))
  await Image.bulkCreate(updatedImages)

  ctx.status = 200
  ctx.body = {status: 'ok'}
};
