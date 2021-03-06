const {v4: uuid} = require('uuid');
const User = require('../models/User');
const {sendMail} = require('../libs/sendMail');
const Favorite = require('../models/Favorite')

module.exports.register = async (ctx) => {
  const { email, password, username, phone } = ctx.request.body
  const verificationToken = uuid()

  const user = User.build({ email, username, verificationToken, phone })
  await user.setPassword(password)
  await user.save()

  Favorite.create({ UserId: user.dataValues.id, ads: [] })

  await sendMail({
    template: 'confirmation',
    locals: { token: verificationToken },
    to: email,
    subject: 'Подтвердите почту',
  });

  ctx.status = 200
  ctx.body = { status: 'ok' }
}

module.exports.confirm = async (ctx) => {
  const {verificationToken} = ctx.request.body

  const user = await User.findOne({ where: { verificationToken } });
  await User.update(
    { verificationToken: null },
    { where: { verificationToken }
  });

  if (user) {
    const token = await ctx.login(user)

    ctx.body = { token, id: user.id }
  } else {
    ctx.status = 400
    ctx.body = { error: 'Ссылка подтверждения недействительна или устарела' }
  }
};
