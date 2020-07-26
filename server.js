// server.js
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.all('*', function(req, res, next){
    origin = req.get('Origin') || '*';
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'Content-Length');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // add the list of headers your site allows.
if ('OPTIONS' == req.method) return res.send(200);
    next();
});


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/angular-sapient'));
// Start the app by listening on the default
// Heroku port


// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', cors(), function(req, res, next) {
    res.sendFile(path.join(__dirname + '/dist/angular-sapient/index.html'));
  });
  


var server_port = process.env.PORT || 8080;
var server_host = '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
