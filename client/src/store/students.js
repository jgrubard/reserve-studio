import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

const getStudents = (students) => ({ type: GET_STUDENTS, students });

export const getStudentsFromServer = () => {
  return dispatch => {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)))
  }
}

const store = (state = [], action) => {
  switch(action.type) {
    case GET_STUDENTS:
      return action.students;
    default:
      return state;
  }
}

export default store;