import React from 'react';
import { connect } from 'react-redux';

const StudentCard = ({ user, student }) => {
  return (
    <div>
      <hr />
      <div className='row'>
        <div className='col'>
          {student.studentId}
        </div>
        <div className='col'>
          {student.email}
        </div>
        <div className='col'>
          {
            user ? <b>{`${user.firstName} ${user.lastName}`}</b> : <i>Student Not Verified</i>
          }
        </div>
        <div className='col'>
          <button className='btn btn-info'>Edit Student Info</button>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ users }, { student }) => {
  const user = users.find(user => user.email === student.email);
  return {
    user
  }
}

export default connect(mapState)(StudentCard)