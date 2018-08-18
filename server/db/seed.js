require('dotenv').config();
const { conn, models } = require('./index');
const { User, Student } = models;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
// const JEREMY_PW = process.env.JEREMY_PW;
const SU_PW = process.env.SU_PW;
const ADMIN_PW = process.env.ADMIN_PW;

const seed = () => {
  return Promise.all([
    // User.create({
    //   firstName: 'Jeremy',
    //   lastName: 'Grubard',
    //   email: 'jgrubard@gmail.com',
    //   password: bcrypt.hashSync(JEREMY_PW, salt)
    // }),
    User.create({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin',
      password: bcrypt.hashSync(ADMIN_PW, salt),
      isAdmin: true
    }),
    User.create({
      firstName: 'Supattra',
      lastName: 'Samanyaphon',
      email: 'su@gmail.com',
      password: bcrypt.hashSync(SU_PW, salt),
      isAdmin: false
    }),
    Student.create({
      studentId: '22586',
      email: 'supattra_samanyaphon@miamiadschool.net'
    }),
    Student.create({
      studentId: '92784',
      email: 'jeremy_grubard@miamiadschool.net'
    }),
    Student.create({
      studentId: '92784',
      email: 'john_smith@miamiadschool.net'
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



