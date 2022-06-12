const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../libs/connection')
const crypto = require('crypto');
const config = require('../config')
const Session = require('./Session')
const Add = require('./Add')
const Notification = require('./Notification')
const Favorite = require('./Favorite')

// indexes ?

const generatePassword = (salt, password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, salt,
      config.crypto.iterations,
      config.crypto.length,
      config.crypto.digest,
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      },
    );
  })
}

const generateSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.crypto.length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  })
}

class User extends Model {
  async setPassword(password) {
    this.salt = await generateSalt()
    this.passwordHash = await generatePassword(this.salt, password)
  }

  async checkPassword(password) {
    if (!password) return false;

    const hash = await generatePassword(this.salt, password)
    return hash === this.passwordHash
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    unique: {
      name: 'username',
      msg: 'Такое имя уже существует',
    },
    allowNull: false,
    validate: {
      notNull: { msg: 'Имя пользователя не должно быть пустым.' },
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      name: 'email',
      msg: 'Такой email уже существует',
    },
    allowNull: false,
    validate: {
      notNull: { msg: 'E-mail пользователя не должен быть пустым.' },
      isEmail: {
        args: true,
        msg: 'Некорректный email.'
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    // unique: {
    //   name: 'email',
    //   msg: 'Такой email уже существует',
    // },
    // allowNull: false,
  },
  verificationToken: { type: DataTypes.STRING, index: true },
  passwordHash: { type: DataTypes.STRING(1234) },
  salt: { type: DataTypes.STRING(1234) },
}, { sequelize, modelName: 'User' })

User.hasMany(Session)
User.hasMany(Add)
User.hasMany(Notification)
User.hasMany(Favorite)

module.exports = User
