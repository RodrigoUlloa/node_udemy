const express = require('express');

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

app.use('/', (req, res, next) => {
  console.log('This always run');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('in another middleware choro');
  res.send('<h1>The "Add Product" Page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('in another middleware choro');
  res.send('<h1>Hello from express!</h1>');
});

app.listen(3000);