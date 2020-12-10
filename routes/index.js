var express = require('express');
var app = express();

const login = require('./login/login');

app.use(login);

module.exports = app;