import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

const getStudents = (students) => ({ type: GET_STUDENTS, students });
const createStudent = (student) => ({ type: CREATE_STUDENT, student });

export const getStudentsFromServer = () => {
  return dispatch => {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)))
  }
}

export const createStudentOnServer = (student) => {
  return dispatch => {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(student => dispatch(createStudent(student)))
  }
}

const store = (state = [], action) => {
  switch(action.type) {
    case GET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [ ...state, action.student ];
    default:
      return state;
  }
}

export default store;