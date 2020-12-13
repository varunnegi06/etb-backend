var express = require('express');
var app = express();

const login = require('./login');
const register = require('./register');

app.use(login);
app.use(register);

module.exports = app;