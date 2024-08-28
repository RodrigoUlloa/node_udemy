const express = require('express');
const bodyParser = require('body-parser');

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

app.use('/add-product', (req, res, next) => {
  // console.log('in another middleware choro');
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
});

app.post('/product', (req, res, next) =>{
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  // console.log('in another middleware choro');
  res.send('<h1>Hello from express!</h1>');
});

app.listen(3000);