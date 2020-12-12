var express = require('express');
var routes = express.Router();

routes.get("/login",async function(req,res){
    
    res.send({ "message":"login Successfully" });
});

routes.post("/loginpost",async function(req,res){
    console.log(JSON.stringify(req.body));
    res.send({ "message":"login Successfully" });
});

module.exports= routes;