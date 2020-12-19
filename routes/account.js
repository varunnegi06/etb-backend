var express = require('express');
var routes = express.Router();
const accountService = require('./../services/accountService');

routes.get('/api/reset', async (req, res) => {
    let login = await accountService.forgotPassword(req);
    res.json(result)
})

routes.post("/forgot",async function(req,res){
    console.log(JSON.stringify(req.body));
    let forgot = await accountService.forgotPassword(req);
    res.send(forgot);
});

module.exports= routes;