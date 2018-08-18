import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../store';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen})
  }

  logoutUser() {
    this.props.logout();
    this.toggle();
  }

  render() {
    const { user, isLogged, isAdmin } = this.props;
    const { isOpen } = this.state;
    const { toggle, logoutUser } = this;
    const dropdown = isOpen ? ' show' : '';
    return (
      <div style={styles.container}>
        <div style={styles.item1}>
          <h2>Welcome to Photo Studio Reservations!</h2>
        </div>
        {
          isLogged &&
            <div style={styles.item2}>
              <h5>
                Welcome, {user.firstName}!
                &nbsp;
                <div className='btn-group'>
                  <button onClick={toggle} className='btn btn-secondary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    Settings
                  </button>
                  <div className={`dropdown-menu${dropdown}`}>
                    <Link to='/' className='dropdown-item' onClick={this.toggle}>Calendar</Link>
                    <Link to='/dashboard' className='dropdown-item' onClick={this.toggle}>Dashboard</Link>
                    {
                      isAdmin &&
                        <div>
                          <div className='dropdown-divider'></div>
                          <Link to='/admin/dashboard' className='dropdown-item' onClick={this.toggle}>Admin</Link>
                        </div>
                    }
                    <div className='dropdown-divider'></div>
                    <div className='dropdown-item' onClick={logoutUser}>Logout</div>
                  </div>
                </div>
              </h5>
            </div>
        }
      </div>
    );
  }
}

const mapState = ({ user }) => {
  const isLogged = !!user.id;
  const { isAdmin } = user;
  return {
    user,
    isLogged,
    isAdmin
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    logout: () => dispatch(logout(history))
  }
}

export default connect(mapState, mapDispatch)(Nav);

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item1: {
    flex: '65%',
    justifyContent: 'flex-end'
  },
  item2: {
    flex: '35%'
  }
}