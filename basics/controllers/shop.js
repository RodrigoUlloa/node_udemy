const Product = require('../models/product');
const Cart = require('../models/cart');
//const products = []; 

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((result) => {
      res.render('shop/product-list', {
        prods: result.rows,
        pageTitle: 'All Products',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {

  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((result) => {
      if (result.rows.length > 0) {
      res.render('shop/product-detail', {
        product: result.rows[0],
        pageTitle: result.rows[0].title,
        path: '/products',
      });
    } else {
      res.redirect('/'); 
    }
  }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((result) => {
      res.render('shop/index', {
        prods: result.rows,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData){
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart',
        products: cartProducts
      });
    });
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};