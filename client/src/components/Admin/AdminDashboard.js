import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <h2>This is the Admin Dashboard</h2>
        <div className='row'>
          <div className='col' style={styles.columns}>
            <Link to='/admin/dashboard/users'>
              Manage Users
            </Link>
          </div>
          <div className='col'>
          <Link to='/admin/dashboard/reservations'>
              Manage Reservations
            </Link>
          </div>
        </div>
      </div>
    ); 
  }
}

export default AdminDashboard;

const styles = {
  columns: {
    textAlign: 'center'
  }
}