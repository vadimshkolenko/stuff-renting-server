const { DataTypes } = require('sequelize');
const { sequelize } = require('../libs/connection')

const Image = sequelize.define('Image', {
  fieldname: { type: DataTypes.STRING },
  originalname: { type: DataTypes.STRING },
  encoding: { type: DataTypes.STRING },
  mimetype: { type: DataTypes.STRING },
  destination: { type: DataTypes.STRING },
  filename: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  size: { type: DataTypes.INTEGER },
});

module.exports = Image
