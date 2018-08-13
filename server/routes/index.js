const app = require('express').Router();

app.use('/users', require('./users'))

module.exports = app;