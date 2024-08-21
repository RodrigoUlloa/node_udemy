const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment</title></head>');
    res.write('<body><h1>greetengs for my page</h1><br><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    return;
  }
  if (url === 'users'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment</title></head>');
    res.write('<body>');
    fs.readFile('users.txt', (err, data) => {
      if(!err) {
        const users = data.toString().split('\n').filters(user => user.trim() !== '');
        res.write('<ul>');
        users.forEach(user => {
          res.write(`<li>${user}</li>`);
        });
        res.write('</ul>');
      }
      res.write('</body>');
      res.write('</html>');
      return res.end();
    })
  }
  
  if (url === '/create-user' && method === 'POST'){
    const body = [] ;
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split('=')[1];
      fs.appendFile('users.txt', user + '\n', (err) => {
        res.setStatusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    })
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Assignment</title></head>');
  res.write('<body><h1>Hello from my node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

exports.handler = requestHandler;
