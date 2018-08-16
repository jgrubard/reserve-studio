import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
const dateFns = require('date-fns');

import TimeSlot from './TimeSlot';

class Day extends Component {
  constructor() {
    super();
    this.createColumn = this.createColumn.bind(this);
    this.createRow = this.createRow.bind(this);
  }

  createRow(time) {
    return (
      <div className='col'>
        {
          this.createColumn(time)
        }
      </div>
    );
  }

  createColumn(time) {
    let hours = [];
    let count = 0;
    // console.log(component)
    while(count < 7) {
      hours.push(
        <div key={count}>
          <TimeSlot first={time}/>
        </div>
      );
      time = dateFns.addMinutes(time, 30);
      count++;
    }
    return hours;
  }

  render() {
    const hours = [];
    const { day } = this.props;
    const first = dateFns.addHours(day, 9);
    const second = dateFns.addHours(first, 3.5);
    const third = dateFns.addHours(second, 3.5);
    return (
      <div>
        <h2>
          {dateFns.format(day, 'dddd, MMMM DD, YYYY')}
          &nbsp;
          <Link to='/'>
            <button className='btn btn-warning'>Return to Calendar</button>
          </Link>
        </h2>
        <div className='row'>
          {this.createRow(first)}
          {this.createRow(second)}
          {this.createRow(third)}
        </div>
      </div>
    );
  }
}

const mapState = (state, { day }) => {
  return {
    day
  }
}

export default connect(mapState)(Day);