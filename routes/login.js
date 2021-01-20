var express = require('express');
var routes = express.Router();
const { User} = require('./../db/sequalize');
const loginService = require('./../services/loginService');

routes.get('/api/users', async (req, res) => {
    let result = await User.findAll();
    console.log(JSON.stringify(result));
    res.json(result)
})

routes.post("/api/loginpost",async function(req,res){
    console.log(JSON.stringify(req.body));
    let login = await loginService.login(req);
    res.send(login);
});

module.exports= routes;