var express = require('express');
var app = express();
var routes = require('./routes/index');
app.use(routes);


app.listen(3000,function(){
    console.log("Server is running ");
});