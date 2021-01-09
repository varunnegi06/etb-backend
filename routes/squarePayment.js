var express = require('express');
var routes = express.Router();
const paymentService = require('./../services/squarePaymentService');

routes.post("/api/processPayment",async function(req,res){
    console.log(JSON.stringify(req.body));
    let payment = await paymentService.processPayment(req);
    res.send(payment);
});

module.exports= routes;