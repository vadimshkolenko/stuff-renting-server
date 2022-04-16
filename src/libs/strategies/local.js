const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
  {usernameField: 'email', session: false},
  async (email, password, done) => {
    try {
      const user = await User.findOne({where: {email}});
      if (!user) return done(null, false, 'Нет такого пользователя');
      if (!await user.checkPassword(password)) return done(null, false, 'Неверный пароль');
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
)
