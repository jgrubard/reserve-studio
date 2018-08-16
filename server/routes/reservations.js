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

app.delete('/:id', (req, res, next) => {
  Reservation.findById(req.params.id)
    .then(reservation => reservation.destroy())
    .then(() => res.sendStatus(201))
    .catch(next);
})

module.exports = app;