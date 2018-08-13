import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <div>
        <input className='form-control' placeholder='email' />
        <input className='form-control' placeholder='password' type='password' />
        <button className='btn btn-success'>Login</button>
      </div>
    );
  }
}

export default Login;