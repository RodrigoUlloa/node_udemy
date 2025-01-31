const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {

  }
}

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