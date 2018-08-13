const conn = require('./conn');
const User = require('./models/User');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return User.create({
        firstName: 'Jeremy',
        lastName: 'Grubard',
        email: 'jgrubard@gmail.com',
        password: 'jeremy'
      })
    })
}

module.exports = {
  conn,
  syncAndSeed,
  models: {
    User
  }
}