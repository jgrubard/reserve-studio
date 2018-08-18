import React from 'react';
import { connect } from 'react-redux';

import StudentCard from './StudentCard';

const StudentList = ({ students, users }) => {
  return (
    <div>
      <h4>Student List</h4>
      <div className='row'>
        <div className='col'>
          <h5>ADMIN INPUT</h5>
        </div>
        <div className='col'>
        <h5>STUDENT VERIFICATION</h5>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col'>
          <b>Student ID</b>
        </div>
        <div className='col'>
          <b>Email</b>
        </div>
        <div className='col'>
        <b>Name</b>
        </div>
        <div className='col'>
        </div>
      </div>
      <hr />
      {
        students.map(student => {
          return (
            <StudentCard student={student} key={student.id}/>
          );
        })
      }
    </div>
  );
}

const mapState = ({ users, students }) => {
  return {
    students,
    users
  }
}

export default connect(mapState)(StudentList);