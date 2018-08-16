import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { createReservationOnServer, deleteReservationFromServer } from '../store';

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
    const { first, reservation, deleteReservation } = this.props;
    const next = dateFns.addMinutes(first, 30);
    return (
      // <div style={Object.assign({}, styles.container, styles.item)}>
      <div style={styles.container}>
        <p>{dateFns.format(first, 'hh:mm a')} - {dateFns.format(next, 'hh:mm a')}</p>
        {
          reservation ? (
            <button className='btn btn-danger' onClick={() => deleteReservation(reservation.id)}>Release Spot</button>
          ) : (
            <button disabled={!!reservation} className='btn btn-primary' onClick={this.reserveSlot}>Reserve</button>
          )
        }
        
      </div>
    );
  }
}

const mapState = ({ reservations, user }, { first }) => {
  const reservation = reservations.find(res => {
    // console.log('1', dateFns.format(first));
    // console.log('2', dateFns.format(res.time));
    // console.log(dateFns.format(res.time) === dateFns.format(first));
    // console.log('-----');
    return dateFns.format(res.time) === dateFns.format(first);
  });
  // console.log(reservation);
  return {
    reservation,
    user,
    first
  }
}

const mapDispatch = dispatch => {
  return {
    createReservation: (reservation) => dispatch(createReservationOnServer(reservation)),
    deleteReservation: (id) => dispatch(deleteReservationFromServer(id))
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