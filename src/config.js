require('dotenv').config()

module.exports = {
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  crypto: {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
  mailer: {
    user: process.env.EMAIL,
    password: process.env.EMAIL_PASS,
  },
}
