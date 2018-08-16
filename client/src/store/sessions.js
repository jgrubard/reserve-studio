import axios from 'axios';

const GOT_USER = 'GOT_USER';

const gotUser = (user) => ({ type: GOT_USER, user });

export const attemptLogin = (credentials) => {
  return dispatch => {
    return axios.post('/api/sessions', credentials)
      .then(res => res.data)
      .then(token => {
        window.localStorage.setItem('token', token);
        return token;
      })
      .then(token => dispatch(getUserFromToken(token)))
  }
}

export const getUserFromToken = (token) => {
  return dispatch => {
    return axios.get(`/api/sessions/${token}`)
      .then(res => res.data)
      .then(user => dispatch(gotUser(user)));
  }
}

export const logout = (history) => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch(gotUser({}));
    if(history.location.pathname !== '/') {
      history.push('/');
    }
  }
}

const store = (state = {}, action) => {
  switch(action.type) {
    case GOT_USER:
      return action.user;
      break;
    default:
      return state;
  }
}

export default store;