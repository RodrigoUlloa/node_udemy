const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('This always run');
  next();
});

app.use('/user', (req, res, next) => {
  console.log('first middleware choro');
  res.send('<h1>user response</h1>');

})

app.use('/', (req, res, next) => {
  console.log('second middleware choro');
  res.send('<h1>root response</h1>');

})

app.listen(3000);