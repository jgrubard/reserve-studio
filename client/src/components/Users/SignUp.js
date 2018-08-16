import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

  onChange(ev) {
    const { name, value } = ev.target;
    const change = {}
    change[name] = value;
    this.setState(change);
  }

  render() {
    const { studentId, email, firstName, lastName, password } = this.state;
    // console.log(studentId, email);
    const { onChange } = this;
    return (
      <div>
        {
          !this.state.approved ? (
            <div>
              <input className='form-control' placeholder='Student ID Number' name='studentId' value={studentId} onChange={onChange} />
              <input className='form-control' placeholder='Email Address' name='email' value={email} onChange={onChange} />
              <button className='btn btn-primary' onClick={this.validateStudentId}>Submit</button>
              { this.state.error && <h4 style={{ color: 'red' }}>{this.state.error}</h4>}
            </div>
          ) : (
            <div>
              <input className='form-control' placeholder='First Name' name='firstName' value={firstName} onChange={onChange} />
              <input className='form-control' placeholder='Last Name' name='lastName' value={lastName} onChange={onChange} />
              <input className='form-control' placeholder='Email Address' name='email' value={email} onChange={onChange} />
              <input className='form-control' placeholder='Password' name='password' value={password} onChange={onChange} />
              <button className='btn btn-primary'>Submit</button>
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

export default connect(mapState)(SignUp);