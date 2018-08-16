const app = require('express').Router();
const { Reservation } = require('../db').models;

app.get('/', (req, res, next) => {
  Reservation.findAll()
    .then(reservations => res.send(reservations))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Reservation.create(req.body)
    .then(reservation => res.send(reservation))
    .catch(next);
});

module.exports = app;