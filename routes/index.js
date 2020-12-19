var express = require('express');
var app = express();

const login = require('./login');
const register = require('./register');
const account = require('./account');

app.use(login);
app.use(register);
app.use(account);

module.exports = app;