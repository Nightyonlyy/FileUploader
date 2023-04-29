const http = require('http');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');
const config = require('./config.json');

const port = config.port || 3000;
const uploadDir = path.join(__dirname, 'pics');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Serve the HTML file
    fs.readFile('index.html', (err, data) => {
      if (err) {
        logError(err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(`Error loading HTML file: ${err}`);
        return;
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else if (req.url === '/upload' && req.method === 'POST') {
    // Handle file upload
    const chunks = [];
    let totalSize = 0;

    req.on('data', chunk => {
      chunks.push(chunk);
      totalSize += chunk.length;
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks, totalSize);
      const originalFileName = req.headers['x-file-name'];
      const filePath = path.join(uploadDir, originalFileName);

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          logError(err);
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end(`Error writing file: ${err}`);
          return;
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('File uploaded successfully!');
      });
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

function logError(err) {
  const timestamp = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
  const errorMessage = `[${timestamp}] ${err.message}`;
  fs.appendFile('error.log', errorMessage, (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  });
}
