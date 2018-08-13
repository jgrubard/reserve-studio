import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import UserList from './Users/UserList';

import { getUsersFromServer } from '../store';

class App extends Component {
  componentDidMount() {
    const { loadUsers } = this.props;
    loadUsers();
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={ Home } />
          <Route exact path='/users' component={ UserList } />
        </div>
      </Router>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(getUsersFromServer())
  }
}

export default connect(mapState, mapDispatch)(App);