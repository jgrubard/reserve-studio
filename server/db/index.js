const conn = require('./conn');
// const { Sequelize } = conn;
const User = require('./models/User');
const Reservation = require('./models/Reservation');

Reservation.belongsTo(User);

module.exports = {
  conn,
  models: {
    User,
    Reservation
  }
}