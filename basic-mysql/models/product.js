const Sequilize = require('sequelize');

const sequilize = require('../util/database');

const Product = sequilize.define('product', {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequilize.STRING,
  price: {
    type: Sequilize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequilize.STRING,
    allowNull: false
  },
  description: {
    type: Sequilize.STRING,
    allowNull: false
  }
});

module.exports = Product;