const conn = require('../conn');
const { Sequelize } = conn;

// let date = new Date();
// console.log('DATE', date, typeof date)

const Reservation = conn.define('reservation', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  time: {
    type: Sequelize.JSONB,
    unique: true
  }
}, {
  timestamps: false
})

module.exports = Reservation;