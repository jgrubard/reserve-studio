import React from 'react';
import Login from './Users/Login';
import CalendarPage from './CalendarPage';
import { connect } from 'react-redux';

const Home = ({ isLogged }) => {
  return (
    <div>
      {
        !isLogged ? (
          <div>
            <h3>Log in Below to reserve a time block!</h3>
            <Login />
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