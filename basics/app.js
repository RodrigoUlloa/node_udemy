const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const expressHbs = require('express-handlebars');

//const routes = require('./routes');
// function rqListener(req, res){

// }
// http.createServer(rqListener);

//funcion anonima
// http.createServer(function(req, res){

// });

// arrow function
// console.log(routes.someText);

//const server = http.createServer(routes.handler);
const app = express();
const db = require('./util/database');
// app.engine(
//   'hbs',
//   expressHbs({
//     layoutsDir: 'views/layout/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );

// testing in bd
// db.query('SELECT * FROM products')
//   .then(result => {
//     // result.rows.forEach(row => {
//     //   console.log(row.title);
//     // })
//     result.rows
//   })
//   .catch(err => {
//     console.log(err);
//   });

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

//const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
// app.use((req, res, next) => {
//   console.log('in the middleware choro');
//   next(); // allows the request to continue to the next middleware in line
// });

// app.use('/', (req, res, next) => {
//   console.log('This always run');
//   next();
// });

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use((req, res, next) => {
//   // res.status(404).send('<h1>Page not found</h1>');
//   //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
//   res.status(404).render('404', {pageTitle: 'Page not Found'});
// });

app.use(errorController.get404);

app.listen(3000);

//module.exports = path.dirname(process.mainModule.filename);