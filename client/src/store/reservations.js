import axios from 'axios';

const GET_RESERVATIONS = 'GET_RESERVATIONS';
const CREATE_RESERVATION = 'CREATE_RESERVATION';
const DELETE_RESERVATION = 'DELETE_RESERVATION';

const getReservations = (reservations) => ({ type: GET_RESERVATIONS, reservations });
const createReservation = (reservation) => ({ type: CREATE_RESERVATION, reservation });
const deleteReservation = (id) => ({ type: DELETE_RESERVATION, id })

export const getReservationsFromServer = () => {
  return dispatch => {
    return axios.get('/api/reservations')
      .then(res => res.data)
      .then(reservations => dispatch(getReservations(reservations)))
  }
}

export const createReservationOnServer = (reservation) => {
  return dispatch => {
    return axios.post('/api/reservations', reservation)
      .then(res => res.data)
      .then(reservation => dispatch(createReservation(reservation)))
  }
}

export const deleteReservationFromServer = (id) => {
  return dispatch => {
    return axios.delete(`/api/reservations/${id}`)
      .then(() => dispatch(deleteReservation(id)))
  }
}

const store = (state = [], action) => {
  let reservations;
  switch(action.type) {
    case GET_RESERVATIONS:
      return action.reservations;
    case CREATE_RESERVATION:
      return [ ...state, action.reservation ]; 
    case DELETE_RESERVATION:
      reservations = state.filter(res => res.id !== action.id)
      return reservations;
    default:
      return state;
  }
}

export default store;