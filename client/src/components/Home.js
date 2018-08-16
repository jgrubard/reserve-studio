import React from 'react';
import Login from './Users/Login';
import CalendarPage from './CalendarPage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isLogged }) => {
  return (
    <div>
      {
        !isLogged ? (
          <div>
            <h3>Log in Below to reserve a time block!</h3>
            <Login />
            <p>Don't have an account?</p>
            <Link to='/signup'>
              Sign Up
            </Link>
          </div>
        ) : (
          <div>
            <CalendarPage />
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

export default connect(mapState)(Home);