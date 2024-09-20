const path = require('path');
const express = require('express');
//const rootDir = require('../util/path');
const productsController = require('../controllers/products');
const router = express.Router();



// /admin/add-product => GET
// router.get('/add-product', (req, res, next) => {
//   // console.log('in another middleware choro');
//   // res.send(
//   //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>'
//   // );
//   //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
//   res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
// });

router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
// router.post('/add-product', (req, res, next) => {
//   // console.log(req.body);
//   products.push({ title: req.body.title });
//   res.redirect('/');
// });

router.post('/add-product', productsController.postAddProduct);

module.exports = router;

// exports.routes = router;
// exports.products = products;