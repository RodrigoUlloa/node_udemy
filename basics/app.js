const http = require('http');
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
app.use((req, res, next) => {
  console.log('in the middleware choro');
});
const server = http.createServer();
server.listen(3000);