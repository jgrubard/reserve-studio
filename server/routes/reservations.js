const app = require('express').Router();
const { Reservation } = require('../db').models;


const dateFns = require('date-fns');

app.get('/', (req, res, next) => {
  Reservation.findAll()
    .then(reservations => res.send(reservations))
    .catch(next);
});

app.post('/', (req, res, next) => {
  // let formatted = dateFns.format(req.body.time)
  // console.log(formatted, typeof formatted);
  // console.log('test');
  // console.log(JSON.parse(req.body.time));
  // console.log('** TIME **', req.body.time);
  // console.log('** FORMATTED **', new Date(formatted))
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