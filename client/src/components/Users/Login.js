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
      <div>
        <input name='email' value={email} onChange={onChange} className='form-control' placeholder='email' />
        <input name='password' value={password} onChange={onChange} className='form-control' placeholder='password' type='password' />
        <button className='btn btn-success' onClick={onSubmit}>Login</button>
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