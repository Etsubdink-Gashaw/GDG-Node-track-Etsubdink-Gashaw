const http = require('http');
const url = require('url');
const { v4: uuidv4 } = require('uuid'); 

let students = [
  { id: '1', name: 'Yunah' },
  { id: '2', name: 'Wonhee' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { method, pathname } = url.parse(req.url, true);
  if (method === 'GET' && pathname === '/students') {
    res.statusCode = 200;
    res.end(JSON.stringify(students));
  }

  else if (method === 'POST' && pathname === '/students') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const { name } = JSON.parse(body);
        if (!name) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Name is required' }));
        }

        const newStudent = { id: uuidv4(), name };
        students.push(newStudent);
        res.statusCode = 201;
        res.end(JSON.stringify(newStudent));
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  else if (method === 'PUT' && pathname.startsWith('/students/')) {
    const id = pathname.split('/')[2];  
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const { name } = JSON.parse(body);
        if (!name) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Name is required' }));
        }

        const student = students.find(s => s.id === id);
        if (!student) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ error: 'Student not found' }));
        }

        student.name = name;
        res.statusCode = 200;
        res.end(JSON.stringify(student));
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  else if (method === 'DELETE' && pathname.startsWith('/students/')) {
    const id = pathname.split('/')[2]; 

    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Student not found' }));
    } else {
      students.splice(index, 1);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Student deleted' }));
    }
  }


  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});


server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
