import fs from 'fs';

export const resHandler = (req, res, next) => {
  fs.readFile('my-page.html', 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
};

//module.exports = resHandler;
//export default resHandler;