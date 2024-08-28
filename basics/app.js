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

const adminRoutes = require('./routes/admin');
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

app.use(adminRoutes);
app.use(shopRoutes);


app.listen(3000);