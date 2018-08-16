const app = require('express').Router();
const { Student } = require('../db').models;

app.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
})

module.exports = app;