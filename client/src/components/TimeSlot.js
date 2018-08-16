import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { createReservationOnServer } from '../store';

const dateFns = require('date-fns')

class TimeSlot extends Component {
  constructor() {
    super();
    this.reserveSlot = this.reserveSlot.bind(this);
  }

  reserveSlot() {
    const {user, first, createReservation } = this.props;
    createReservation({ userId: user.id, time: first });
  }

  render() {
    const { first } = this.props;
    const next = dateFns.addMinutes(first, 30);
    return (
      // <div style={Object.assign({}, styles.container, styles.item)}>
      <div style={styles.container}>
        <p>{dateFns.format(first, 'hh:mm a')} - {dateFns.format(next, 'hh:mm a')}</p>
        <button className='btn btn-primary' onClick={this.reserveSlot}>Reserve</button>
      </div>
    );
  }
}

const mapState = ({ user }, { first }) => {
  return {
    user,
    first
  }
}

const mapDispatch = dispatch => {
  return {
    createReservation: (reservation) => dispatch(createReservationOnServer(reservation))
  }
}

export default connect(mapState, mapDispatch)(TimeSlot);

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    width: '200px'
  },
}