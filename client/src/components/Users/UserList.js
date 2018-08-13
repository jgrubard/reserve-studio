import React from 'react';
import { connect } from 'react-redux'

const UserList = ({ users }) => {
  // const { users } = this.props;
  return (
    <div>
      <h1>All Users</h1>
      {
        users.map(user => {
          return (
            <div key={user.id}>
              {user.name}
            </div>
          )
        })
      }
    </div>
  );
}

const mapState = ({ users }) => {
  return {
    users
  }
}

export default connect(mapState)(UserList);