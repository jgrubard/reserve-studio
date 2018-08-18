import React from 'react';
import CreateStudent from './CreateStudent';
import StudentList from './StudentList';

const DashUsers = () => {
  return (
    <div>
      <div style={styles.component}>
        <CreateStudent />
      </div>
      <div style={styles.component}>
        <StudentList />
      </div>
    </div>
  );
}

export default DashUsers;

const styles = {
  component: {
    margin: '40 0'
  }
}