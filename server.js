// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.options('*', cors());


// add this code
const whitelist = ['http://localhost:3000',
                   'https://angular-sapient.herokuapp.com',
                   'http://angular-sapient.herokuapp.com',
                   'https://angular-sapient.herokuapp.com:8080',
                   'http://angular-sapient.herokuapp.com:8080',
                   'https://angular-sapient.herokuapp.com:3000',
                   'http://angular-sapient.herokuapp.com:3000'                                 
                  ]; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

// end 


app.use(cors(corsOptions));

/////////////////////////////
// Run the app by serving the static files
// in the dist directory
//app.use(express.static(__dirname + '/dist/angular-sapient'));
// Start the app by listening on the default
// Heroku port

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
//app.get('/*', function(req, res) {
//    res.sendFile(path.join(__dirname + '/dist/angular-sapient/index.html'));
 // });
//////////////////////////////  
app.use(express.static('./dist/angular-sapient'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/angular-sapient/index.html'));
});

//app.listen(process.env.PORT || 8080);

var server_port = process.env.PORT || 8080;
var server_host = '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
