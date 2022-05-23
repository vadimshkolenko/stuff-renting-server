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
  qiwi: {
    publicKey: '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPtPPqaTYjmS6SNeTU3subUeDTfrEiDbUTPcDYHeEvmWwyb4UR7WEHwnPmUFPvQW99upayFbruB3Zuvvy5dyJ86V5fzuyS2qBxduFJEn4WM',
    token: process.env.QIWI_TOKEN
  }
}
