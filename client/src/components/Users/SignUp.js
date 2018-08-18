import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signup } from '../../store';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      approved: false,
      studentId: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.validateStudentId = this.validateStudentId.bind(this);
    this.attemptSignUp = this.attemptSignUp.bind(this);
  }

  validateStudentId() {
    const { studentId, email } = this.state;
    const { students } = this.props;
    const student = students.find(student => student.studentId === studentId && student.email === email)
    if(student) {
      this.setState({ approved: true, error: '', email });
    } else {
      this.setState({ error: 'We\'re sorry, but we can\'t seem to find you...' })
    }
  }

  attemptSignUp() {
    const { signupUser } = this.props;
    const { email, firstName, lastName, password } = this.state;
    signupUser({ email, firstName, lastName, password });
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const change = {}
    change[name] = value;
    this.setState(change);
  }

  render() {
    const { studentId, email, firstName, lastName, password } = this.state;
    const { onChange, attemptSignUp } = this;
    return (
      <div style={{ margin: '10px' }}>
        {
          !this.state.approved ? (
            <div>
              <h4>First, we need to check that you're a student.</h4>
              <div style={styles.fields}>
                <input style={styles.input} className='form-control' placeholder='Student ID Number' name='studentId' value={studentId} onChange={onChange} />
                <input style={styles.input} className='form-control' placeholder='Email Address' name='email' value={email} onChange={onChange} />
                <button className='btn btn-primary' onClick={this.validateStudentId}>Submit</button>
                { this.state.error && <h4 style={{ color: 'red' }}>{this.state.error}</h4>}
              </div>
            </div>
          ) : (
            <div>
              <h4>Now, let's get signed up so we can reserve a spot!</h4>
              <div style={styles.fields}>
                <input style={styles.input} className='form-control' placeholder='First Name' name='firstName' value={firstName} onChange={onChange} />
                <input style={styles.input} className='form-control' placeholder='Last Name' name='lastName' value={lastName} onChange={onChange} />
                <input style={styles.input} className='form-control' placeholder='Email Address' name='email' value={email} onChange={onChange} />
                <input style={styles.input} className='form-control' placeholder='Password' type='password' name='password' value={password} onChange={onChange} />
                <button className='btn btn-primary' onClick={attemptSignUp}>Submit</button>
              </div>
            </div>
          )
        }

        <p>Already a member?</p>
        <Link to='/'>
          Login
        </Link>
      </div>
    );
  }
}

const mapState = ({ students }) => {
  return {
    students
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    signupUser: (user) => dispatch(signup(user, history))
  }
}

export default connect(mapState, mapDispatch)(SignUp);

const styles = {
  input: {
    margin: '10 0'
  },
  fields: {
    width: '300px'
  }
}