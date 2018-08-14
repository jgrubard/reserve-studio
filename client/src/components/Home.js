import React from 'react';
import Login from './Users/Login';
import { connect } from 'react-redux';

import { logout } from '../store';

const Home = ({ user, isLogged, logout }) => {
  return (
    <div>
      <h2>Welcome to Photo Studio Reservations!</h2>
      {
        !isLogged ? (
          <div>
            <h3>Log in Below to reserve a time block!</h3>
            <Login />
          </div>
        ) : (
          <div>
            <h3>Welcome, {user.firstName}!</h3>
            <button className='btn btn-warning' onClick={logout}>Logout</button>
          </div>
        )
      }

    </div>
  );
}

const mapState = ({ user }) => {
  const isLogged = !!user.id;
  return {
    user,
    isLogged
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Home);