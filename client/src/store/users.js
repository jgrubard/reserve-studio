import axios from 'axios';

const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER'

const getUsers = (users) => ({ type: GET_USERS, users });
export const createUser = (user) => ({ type: CREATE_USER, user })

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
    case CREATE_USER:
      return [ ...state, action.user ];
    default:
      return state;
  }
}

export default store;