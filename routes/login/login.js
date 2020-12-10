var express = require('express');
var routes = express.Router();

routes.get("/login",async function(req,res){
    
    res.send({ "message":"login Successfully" });
});


module.exports= routes;