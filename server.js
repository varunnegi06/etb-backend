var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
var routes = require('./routes/index');
app.use(routes);


app.listen(3000,function(){
    console.log("Server is running ");
});