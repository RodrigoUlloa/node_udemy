const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  // constructor() {
  //   this.products = [];
  //   this.totalPrice = 0;
  // }

  static addProduct(id, productPrice) {
    // fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //analyze the cart find exsisting prodyuct
      const exsistingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const exsistingProduct = cart.products[exsistingProductIndex];
      let updatedProduct;
      //add new product/ increase quantity
      if (exsistingProduct) {
        updatedProduct = {...exsistingProduct};
        updatedProduct.qty = updatedProduct.qty +1;
        cart.products = [...cart.products];
        cart.products[exsistingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice){
    fs.readFile(p, (err, fileContent) => {
      if (err){
        return;
      }
      const updatedCart = {...JSON.parse(fileContent) };
      const product = updatedCart.products.findIndex(prod => prod.id === id);
      if (!product){
        return ;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id 
      );
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb){
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err){
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};