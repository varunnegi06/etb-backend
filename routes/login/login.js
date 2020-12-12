var express = require('express');
var routes = express.Router();
const { User} = require('../../db/sequalize');

routes.get('/api/users', async (req, res) => {
    let result = await User.findAll();
    console.log(JSON.stringify(result));
    res.json(result)
})

routes.post("/loginpost",async function(req,res){
    console.log(JSON.stringify(req.body));
    res.send({ "message":"login Successfully" });
});

module.exports= routes;