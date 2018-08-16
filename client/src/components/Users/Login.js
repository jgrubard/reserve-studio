import React, { Component } from 'react';
import { connect } from 'react-redux';

import { attemptLogin } from '../../store';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const {name, value} = ev.target;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { attemptLogin } = this.props;
    attemptLogin(this.state);
  }

  render() {
    // console.log(this.state);
    const { email, password } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div style={styles.login}>
        <input style={styles.input} name='email' value={email} onChange={onChange} className='form-control' placeholder='email' />
        <input style={styles.input} name='password' value={password} onChange={onChange} className='form-control' placeholder='password' type='password' />
        <button style={styles.input} className='btn btn-success' onClick={onSubmit}>Login</button>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials))
  }
}

export default connect(mapState, mapDispatch)(Login);

const styles = {
  login: {
    width: '300px'
  },
  input: {
    margin: '10 0'
  }
}