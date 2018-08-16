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
    createReservation({ userId: user.id, time: first });
  }

  render() {
    const { user, reservedUser, first, reservation, deleteReservation } = this.props;
    const next = dateFns.addMinutes(first, 30);
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
    return dateFns.format(res.time) === dateFns.format(first);
  });
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