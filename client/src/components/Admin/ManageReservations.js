import React from 'react';
import { connect } from 'react-redux';

const dateFns = require('date-fns');

import ConvertTimeSpan from '../ConvertTimeSpan';

const ManageReservations = ({ users, reservations }) => {
  return (
    <div>
      <h4>Manage Reservations</h4>
      {
        reservations.length
          ? reservations.map(res => {
              const user = users.find(user => user.id === res.userId)
              return (
                <div key={res.id} style={styles.container}>
                  {user.firstName} {user.lastName}
                  <br />
                  {dateFns.format(res.time, 'dddd, MMMM DD, YYYY')}
                  <ConvertTimeSpan date={res.time} />
                  {/* RES.TIME - {res.time} */}
                </div>
              )
            })
            : 'No reservations'
          
      }
    </div>
  );
}

const mapState = ({ users, reservations }) => {
  return {
    users,
    reservations
  }
}

export default connect(mapState)(ManageReservations);

const styles = {
  container: {
    margin: '20 0'
  }
}