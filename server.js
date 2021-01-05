var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
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


app.listen(3001,function(){
    console.log("Server is running ");
});