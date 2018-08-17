import axios from 'axios';

import { createUser } from './users';

const GOT_USER = 'GOT_USER';

const gotUser = (user) => ({ type: GOT_USER, user });

export const signup = (user, history) => {
  // console.log('signup:', user)
  return dispatch => {
    return axios.post('/api/sessions/signup', user)
      .then(res => res.data)
      .then(token => {
        // console.log(token)
        window.localStorage.setItem('token', token);
        return token;
      })
      .then(token => dispatch(getUserFromToken(token)))
      .then(user => dispatch(createUser(user)))
      .then(() => history.push('/'))
  }
}

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
  // console.log(token)
  return dispatch => {
    return axios.get(`/api/sessions/${token}`)
      .then(res => res.data)
      .then(user => {
        dispatch(gotUser(user))
        return user;
      });
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