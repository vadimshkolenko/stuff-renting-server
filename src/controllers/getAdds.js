const Add = require('../models/Add')
const Image = require('../models/Image')
const User = require('../models/User')
const { sequelize } = require('../libs/connection')

module.exports.getAdds = async (ctx) => {
  //{ include: {model: Image, as: 'images'}}
  //{ include: { association: 'images' } }
  // console.log('_______________', await Add.findAll({ include: {model: Image, as: 'images'}}))

  //TODO убрать позорный костыль

  const adds = await Add.findAll();
  const images = await Image.findAll()

  const data = adds.map(add => {
    add.dataValues.images = []
    images.forEach(image => {
      if (image.addId === add.id) {
        add.dataValues.images.push(image)
      }
    })

    return add
  })

  ctx.status = 200
  ctx.body = {status: 'ok', data}
};
