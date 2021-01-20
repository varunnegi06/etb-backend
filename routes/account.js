var express = require('express');
var routes = express.Router();
const accountService = require('./../services/accountService');

routes.get('/api/reset', async (req, res) => {
    let login = await accountService.forgotPassword(req);
    res.json(result)
})

routes.post("/api/forgot",async function(req,res){
    console.log(JSON.stringify(req.body));
    let forgot = await accountService.forgotPassword(req);
    res.send(forgot);
});

routes.post("/api/reset",async function(req,res){
    console.log(JSON.stringify(req.body));
    let forgot = await accountService.resetPassword(req);
    res.send(forgot);
});

module.exports= routes;