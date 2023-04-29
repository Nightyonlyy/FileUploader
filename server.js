const http = require('http');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');
const config = require('./config.json');
const { exec } = require('child_process');
const port = config.port || 3000;
var filePath = config.picturePath;
const uploadDir = path.join(__dirname, filePath);

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
  } 
  if (req.url === '/upload' && req.method === 'POST') {
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
  }
  if (req.url === '/runscript' && req.method === 'GET') {
    exec('python3 testpython.py', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(`Error running Python script: ${err}`);
      } else {
        console.log(stdout);
        console.log("test")
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(stdout);
      }
    });
  }
  if (req.url === '/lastuploaded' && req.method === 'GET') {
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        logError(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error reading upload directory: ${err}`);
        return;
      }
      files = files.map((name) => {
        const filePath = path.join(uploadDir, name);
        const stats = fs.statSync(filePath);
        return { name, mtime: stats.mtimeMs };
      }).sort((a, b) => b.mtime - a.mtime);
      if (files.length > 0) {
        const timestamp = DateTime.now().toFormat('dd.MM.yyyy HH:mm:ss');
        const mostRecentFile = files[0];
        const response = {
          name: mostRecentFile.name,
          timestamp: timestamp,
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('No files uploaded yet');
      }
    });
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
