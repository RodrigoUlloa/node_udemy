// this code is not functional we no retriving data for a archive!!
// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };
const db = require('..//util//database');
const Cart = require('./cart');
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.query(
      'INSERT INTO products (title, description, price, "imageUrl") VALUES ($1, $2, $3, $4)',
      [this.title, this.description, this.price, this.imageUrl]
    ); //ajustar query para la libreria pg

    // getProductsFromFile(products => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       prod => prod.id === this.id
    //     );
    //     const updatedProducts = [...products]
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  static deleteById(id) {
    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(prod => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   })
    // });
  }

  static fetchAll() {
    // getProductsFromFile(cb); we dont need callback
    return db.query('SELECT * FROM products');
  }

  static findById(id) {
    // getProductsFromFile(products => {
    //   const product = products.find(p => p.id === id);
    //   cb(product);
    // }); -> we dont need a callback
    return db.query('SELECT * FROM products WHERE products.id = $1', [id] );
  }
};