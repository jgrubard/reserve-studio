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
    const {user, reservedUser, first, createReservation } = this.props;
    // console.log('first', first);
    // let time = JSON.stringify(first)
    // console.log('time', time);
    createReservation({ userId: user.id, time: first });
  }

  render() {
    const { user, reservedUser, first, reservation, deleteReservation } = this.props;
    const next = dateFns.addMinutes(first, 30);
    // console.log('first', first);
    // console.log('next', next);
    return (
      <div style={styles.container}>
        <p>{dateFns.format(first, 'hh:mm a')} - {dateFns.format(next, 'hh:mm a')}</p>
        {
          !!reservation && reservation.userId === user.id && 
            <button className='btn btn-danger' onClick={() => deleteReservation(reservation.id)}>Release Spot</button>
        }
        {
          !!reservation && reservation.userId !== user.id && 
            <div>
              <p>Reserved by:<br />{reservedUser.firstName} {reservedUser.lastName}</p>
            </div>
        }
        {
          !reservation && 
          <button className='btn btn-primary' onClick={this.reserveSlot}>Reserve</button>
        }
      </div>
    );
  }
}

const mapState = ({ reservations, user, users }, { first }) => {
  const reservation = reservations.find(res => {
    // console.log('res.time:', dateFns.format(res.time));
    // console.log('first:', dateFns.format(first));
    return dateFns.format(res.time) === dateFns.format(first);
    // return JSON.stringify(res.time) === JSON.stringify(first);
  });
  console.log('RESERVATION:', reservation)
  const reservedUser = reservation && users.find(user => user.id === reservation.userId)
  return {
    reservation,
    user,
    reservedUser,
    users, 
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