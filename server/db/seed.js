const { conn, models } = require('./index');
const { User } = models;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const JEREMY_PASSWORD = process.env.JEREMY_PASSWORD;

// console.log(bcrypt);

const seed = () => {
  return Promise.all([
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      email: 'jgrubard@gmail.com',
      password: bcrypt.hashSync(JEREMY_PASSWORD, salt)
    })
  ])
}

conn.sync({ force: true })
  .then(() => {
    console.log('Seeding Database.')
    return seed();
  })
  .then(() => console.log('Database Seeded.'))
  .then(() => {
    conn.close();
    console.log('Connection Closed')
    return null;
  })
  .catch(err => {
    console.log('Error Seeding Database.');
    console.error(err);
  })



