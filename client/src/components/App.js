import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import UserList from './Users/UserList';
import Day from './Day';

import { getUsersFromServer, getUserFromToken, getReservationsFromServer } from '../store';

class App extends Component {
  componentDidMount() {
    const { loadUsers, loadLoggedUser, loadReservations } = this.props;
    loadLoggedUser();
    loadUsers();
    loadReservations();
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={ Home } />
          {/* <Route exact path='/users' component={ UserList } /> */}
          <Route exact path='/calendar/:day' component={(match) => <Day day={match.match.params.day} />} />
        </div>
      </Router>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => {
  return {
    loadLoggedUser: () => {
      const token = window.localStorage.getItem('token');
      if(token) {
        dispatch(getUserFromToken(token));
      }
    },
    loadUsers: () => dispatch(getUsersFromServer()),
    loadReservations: () => dispatch(getReservationsFromServer())
  }
}

export default connect(mapState, mapDispatch)(App);