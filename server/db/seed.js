require('dotenv').config();
const { conn, models } = require('./index');
const { User, Student } = models;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const JEREMY_PW = process.env.JEREMY_PW;
const SU_PW = process.env.SU_PW;

const seed = () => {
  return Promise.all([
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      email: 'jgrubard@gmail.com',
      password: bcrypt.hashSync(JEREMY_PW, salt)
    }),
    User.create({
      firstName: 'Supattra',
      lastName: 'Samanyaphon',
      email: 'su@gmail.com',
      password: bcrypt.hashSync(SU_PW, salt)
    }),
    Student.create({
      studentId: '256',
      email: 'glenn@gmail.com'
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



