var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var https = require('https');
var fs = require('fs');
/*
 * DB Config file based on ENV triggered from pm2
 */
if (process.env.NODE_ENV === "PROD") {
    require('custom-env').env('PROD-config');
} else {
    require('custom-env').env('DEV-config');
}

app.use(cors());
app.use(bodyParser.json());
var routes = require('./routes/index');
app.use(routes);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var options = {
  key: fs.readFileSync('./certs/etb-dekam.key'),
  cert: fs.readFileSync('./certs/etb-dekam.crt')
};

var server = https.createServer(options,app);

server.listen(3001,function(){
    console.log("Server is running ");
});