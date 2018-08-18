const app = require('express').Router();
const { Student } = require('../db').models;

app.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
})

module.exports = app;