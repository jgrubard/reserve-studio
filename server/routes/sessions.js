const app = require('express').Router();
const { User } = require('../db').models;
const jwt = require('jwt-simple');

app.post('/', (req, res, next) => {
  const credentials = req.body;
  User.findOne({
    where: credentials
  })
  .then(user => {
    if(user) {
      const token = jwt.encode({ id: user.id }, 'foo');
      // console.log('token', token)
      return token;
    }
    throw { status: 401 };
  })
  .catch(err => {
    throw(err);
  })
  .then(token => res.send(token))
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
      // .then(user => res.send)
  } catch(exception) {
    throw exception;
  }
})

module.exports = app;