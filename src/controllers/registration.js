const {v4: uuid} = require('uuid');
const User = require('../models/User');
const {sendMail} = require('../libs/sendMail');

module.exports.register = async (ctx) => {
  const {email, password, username} = ctx.request.body
  const verificationToken = uuid()
  // const id = uuid()

  await User.sync()
  const user = User.build({email, username, verificationToken})
  await user.setPassword(password)
  await user.save()

  await sendMail({
    template: 'confirmation',
    locals: {token: verificationToken},
    to: email,
    subject: 'Подтвердите почту',
  });

  ctx.status = 200
  ctx.body = {status: 'ok'}
}

module.exports.confirm = async (ctx) => {
  const {verificationToken} = ctx.request.body

  const user = await User.findOne({ where: { verificationToken } });
  await User.update(
    { verificationToken: null },
    {where: {verificationToken}
  });

  if (user) {
    const token = await ctx.login(user)

    ctx.body = {token, id: user.id}
  } else {
    ctx.status = 400
    ctx.body = {error: 'Ссылка подтверждения недействительна или устарела'}
  }
};
