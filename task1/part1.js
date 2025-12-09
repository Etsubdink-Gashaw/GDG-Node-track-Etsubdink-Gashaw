const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'application/json');
  const { method, pathname } = url.parse(req.url, true);


  if (method === 'GET' && pathname === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Welcome to the Home Page' }));
  }

  else if (method === 'GET' && pathname === '/info') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'This is the information page' }));
  }

  else if (method === 'POST' && pathname === '/submit') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });


    req.on('end', () => {
      try {
        const jsonData = JSON.parse(body);
        res.statusCode = 200;
        res.end(JSON.stringify(jsonData));
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }


  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
