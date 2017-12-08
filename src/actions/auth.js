import { post, get } from '../httpMethods.js';

const authStudent = (token, success, error) => {
  return get(`/signin/${token}`).then(success).catch(error)
};

const enrollStudent = (studentData, success, error) => {
  post('/signup', studentData).then(success).catch(error)
};

export { authStudent, enrollStudent };