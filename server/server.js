// server.js, a simplified example
 
var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
 
// [ set up database connection, authentication, logging ... ] 
 
// serve static files
app.use(express.static(__dirname + '/../client/www'));
 
app.get('/', (req, res) => {
  res.sendFile(path.resolve('../client/index.html'));
});
 
// set up path to key and certificate files
 
var options = {
  key: fs.readFileSync('path-to-privkey.pem'),
  cert: fs.readFileSync('path-to-cert.pem')
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
