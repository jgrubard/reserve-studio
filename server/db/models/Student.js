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
}, {
  timestamps: false,
  getterMethods: {
    firstName() {
      const fullName = this.email.slice(0,-18);
      const firstName = fullName.split('_')[0];
      return firstName[0].toUpperCase() + firstName.slice(1);
    },
    lastName() {
      const fullName = this.email.slice(0,-18);
      const lastName = fullName.split('_')[1];
      return lastName[0].toUpperCase() + lastName.slice(1);
    }
  }
})

module.exports = Student;