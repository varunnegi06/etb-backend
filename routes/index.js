var express = require('express');
var app = express();

const login = require('./login');
const register = require('./register');
const squarePayment = require('./squarePayment');

app.use(login);
app.use(register);
app.use(squarePayment);

module.exports = app;