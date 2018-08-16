const app = require('express').Router();

app.use('/sessions', require('./sessions'));
app.use('/users', require('./users'));
app.use('/reservations', require('./reservations'));

module.exports = app;