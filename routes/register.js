var express = require('express');
var routes = express.Router();
const registerService = require('./../services/registerService');
const { Address} = require('../db/sequalize');

routes.get('/api/address', async (req, res) => {
    let result = await Address.findAll();
    console.log(JSON.stringify(result));
    res.json(result)
});

routes.post('/api/register', async (req, res) => {
    let result = await registerService.register(req);
    console.log(JSON.stringify(result));
    res.json(result)
});

routes.post('/api/checkEmailExists', async (req, res) => {
    let result = await registerService.checkEmailExists(req);
    console.log(JSON.stringify(result));
    res.json(result)
});

module.exports= routes;