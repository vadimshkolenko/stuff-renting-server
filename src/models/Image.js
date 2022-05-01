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
  addId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Adds',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  },
});

Image.associate = (models) => {
  Image.belongsTo(models.Add, {foreignKey: 'addId', as: 'add', allowNull: false})
}

module.exports = Image
