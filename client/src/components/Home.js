import React from 'react';
import Login from './Users/Login';

const Home = () => {
  return (
    <div>
      <h2>Welcome to Photo Studio Reservations!</h2>
      <h3>Log in Below to reserve a time block!</h3>
      <Login />
    </div>
  );
}

export default Home;