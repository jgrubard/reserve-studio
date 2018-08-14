const app = require('express').Router();
const { User } = require('../db').models;
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

app.post('/', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email }
  })
  .then(user => {
    const hash = user.password;
    bcrypt.compare(password, hash)
      .then(result => {
        if(result) {
          return user;
        }
        throw { status: 401 }
      })
      .then(user => {
        if(user) {
          const token = jwt.encode({ id: user.id }, 'foo');
          return token;
        }
        throw { status: 401 };
      })
      .catch(err => {
        throw(err)
      })
      .then(token => res.send(token))
  })
})

app.get('/:token', (req, res, next) => {
  const { token } = req.params;
  try {
    const id = jwt.decode(token, 'foo').id;
    User.findById(id)
      .then(user => {
        if(user) {
          return res.send(user);
        } else {
          throw { status: 401 }
        }
      })
  }
  catch(exception) {
    throw exception;
  }
})

module.exports = app;