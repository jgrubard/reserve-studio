const app = require('express').Router();
module.exports = app;
const { User } = require('../db').models;

app.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});