const { conn, models } = require('./index');
const { User } = models;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// console.log(bcrypt);

const seed = () => {
  return Promise.all([
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      email: 'jgrubard@gmail.com',
      password: bcrypt.hashSync('jeremy', salt)
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



