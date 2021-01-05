var express = require('express');
var app = express();

const login = require('./login');
const register = require('./register');
const account = require('./account');
const squarePayment = require('./squarePayment');

app.use(login);
app.use(register);
app.use(account);
app.use(squarePayment);

module.exports = app;