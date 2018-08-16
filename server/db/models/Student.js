const conn = require('../conn');
const { Sequelize } = conn;

const Student = conn.define('students', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  studentId: Sequelize.STRING,
  email: Sequelize.STRING
})

module.exports = Student;