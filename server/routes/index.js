const app = require('express').Router();

app.use('/sessions', require('./sessions'));
app.use('/users', require('./users'));

module.exports = app;