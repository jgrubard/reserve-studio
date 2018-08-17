const app = require('express').Router();
const { User } = require('../db').models;
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const JWT_KEY = process.env.JWT_KEY;

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
          const token = jwt.encode({ id: user.id }, JWT_KEY);
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

app.post('/signup', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const pw = bcrypt.hashSync(password, salt);
  User.create({ firstName, lastName, email, password: pw })
    .then(user => {
      if(user) {
        const token = jwt.encode({ id: user.id }, JWT_KEY);
        return token;
      }
      throw { status: 401 };
    })
    .catch(err => {
      throw(err)
    })
    .then(token => res.send(token))
})


app.get('/:token', (req, res, next) => {
  const { token } = req.params;
  try {
    const id = jwt.decode(token, JWT_KEY).id;
    User.findById(id)
      .then(user => {
        if(user) {
          return res.send(user);
        } else {
          console.log('before throwing 401')
          throw { status: 401 }
        }
      })
  }
  catch(exception) {
    console.log('before throwing exception')
    throw exception;
  }
})

module.exports = app;