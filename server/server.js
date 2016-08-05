// server.js, a simplified example
 
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express(); 
// [ set up database connection, authentication, logging ... ] 
 
// serve static files
app.use(express.static(__dirname + '/../client/www'));

// serve index.html from site root 
app.get('/', (req, res) => {
  res.sendFile(path.resolve('../client/index.html'));
});
 
// set up path to key and certificate files
 
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/node-https-example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/node-https-example.com/cert.pem')
};
 
// create an HTTPS service 
https.createServer(options, app).listen(443, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Server is listening on port 443');
});
 
// redirect from http (port 80) to https (port 443)
http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);
