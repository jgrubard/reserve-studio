const conn = require('../conn');
const { Sequelize } = conn;

const Reservation = conn.define('reservation', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  time: Sequelize.STRING,
})

module.exports = Reservation;