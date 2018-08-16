import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteReservationFromServer } from '../../store';

const dateFns = require('date-fns');

class Dashboard extends Component {
  render() {
    const { ownReservations, deleteRes } = this.props;
    return (
      <div>
        <h2>My Dashboard</h2>
        {
          !ownReservations.length &&
            <h4>You currently have no reservations made.</h4>
        }
        {
          ownReservations.map(res => {
            const day = dateFns.format(res.time, 'dddd, MMMM DD, YYYY');
            const time1 = dateFns.format(res.time, 'hh:mm a');
            const time2 = dateFns.format(dateFns.addMinutes(res.time, 30), 'hh:mm a');
            return (
              <div key={res.id} style={styles.reservations}>
                <button className='btn btn-danger' onClick={() => deleteRes(res.id)}>Release Timeslot</button>
                &nbsp;
                <b>{day}</b> | <i>{time1}-{time2}</i>
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapState = ({ user, reservations }) => {
  const ownReservations = reservations.filter(res => res.userId === user.id);
  return {
    user,
    ownReservations
  }
}

const mapDispatch = dispatch => {
  return {
    deleteRes: (id) => dispatch(deleteReservationFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(Dashboard);

const styles = {
  reservations: {
    margin: '20px'
  }
}