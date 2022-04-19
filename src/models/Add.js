const { DataTypes } = require('sequelize');
const { sequelize } = require('../libs/connection')
const User = require('./User')

const Add = sequelize.define('Add', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deposit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  },
  // images: [
  //   {
  //     data_url: DataTypes.BLOB,
  //     file: {
  //       lastModified: DataTypes.INTEGER,
  //       lastModifiedDate: DataTypes.DATE,
  //       name: DataTypes.STRING,
  //       size: DataTypes.INTEGER,
  //       type: DataTypes.STRING,
  //       webkitRelativePath: DataTypes.STRING
  //     }
  //   }
  // ]
});

Add.associate = (models) => {
  // User
  Add.belongsTo(models.User, {foreignKey: {name: 'userId', allowNull: false}})
}

module.exports = Add
