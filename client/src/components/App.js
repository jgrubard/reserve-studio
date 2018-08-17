import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import UserList from './Users/UserList';
import Day from './Day';
import Nav from './Nav';
import Dashboard from './Users/Dashboard';
import SignUp from './Users/SignUp';

import { getUsersFromServer, getUserFromToken, getReservationsFromServer, getStudentsFromServer } from '../store';

class App extends Component {
  componentDidMount() {
    const { loadUsers, loadLoggedUser, loadReservations, loadStudents } = this.props;
    loadLoggedUser();
    loadUsers();
    loadReservations();
    loadStudents();
  }

  render() {
    return (
      <Router>
        <div>
          <div style={styles.header}>
            <Route component={({ history }) => <Nav history={ history } />} />
          </div>
          <div className='container'>
            <Route exact path='/' component={ Home } />
            <Route exact path='/calendar/:day' component={({ match }) => <Day day={match.params.day} />} />
            <Route exact path='/dashboard' component={ Dashboard } />
            <Route exact path='/signup' component={ ({ history }) => <SignUp history={history} /> } />
          </div>
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
    loadReservations: () => dispatch(getReservationsFromServer()),
    loadStudents: () => dispatch(getStudentsFromServer())
  }
}

export default connect(mapState, mapDispatch)(App);

const styles = {
  header: {
    padding: '10 20',
    backgroundColor: 'lightgrey'
  }
}