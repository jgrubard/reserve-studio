import axios from 'axios';

const GET_USERS = 'GET_USERS';

const getUsers = (users) => ({ type: GET_USERS, users });

export const getUsersFromServer = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(getUsers(users)))
  }
}

const store = (state = [], action) => {
  switch(action.type) {
    case GET_USERS:
      return action.users;
      break;
    default:
      return state;
  }
}

export default store;