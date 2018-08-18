import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStudentOnServer } from '../../store';

class CreateStudent extends Component {
  constructor() {
    super();
    this.state = {
      studentId: '',
      email: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { createStudent } = this.props;
    createStudent(this.state);
  }

  render() {
    const { onChange, onSubmit } = this;
    const { studentId, email } = this.state;
    return (
      <div>
        <h4>Enter Student ID and Email for student Verification</h4>
        <input style={styles.input} className='form-control' placeholder='Student ID' name='studentId' value={studentId} onChange={onChange} />
        <input style={styles.input} className='form-control' placeholder='Student Email' name='email' value={email} onChange={onChange} />
        <button className='btn btn-primary' onClick={onSubmit}>Submit</button>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = (dispatch) => {
  return {
    createStudent: (student) => dispatch(createStudentOnServer(student))
  }
}

export default connect(mapState, mapDispatch)(CreateStudent);

const styles = {
  input: {
    margin: '10 0',
    width: '300px'
  }
}