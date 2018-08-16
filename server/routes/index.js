const app = require('express').Router();

app.use('/sessions', require('./sessions'));
app.use('/users', require('./users'));
app.use('/reservations', require('./reservations'));
app.use('/students', require('./students'));

module.exports = app;