const Product = require('../models/product');
//const products = []; 

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product', 
    formsCSS: true, 
    productCSS: true, 
    activeAddProduct: true 
  });
};

exports.postAddProduct = (req, res, next) => {
  //products.push({ title: req.body.title });
  const product = new Product.new(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop', {
    prods: products, 
    pageTitle: 'Shop', 
    path: '/',
    hasProducts: products.lenght > 0,
    activeShop: true,
    productCSS:true
  });
};