import { post, get } from '../httpMethods.js';

const authStudent = (identityDocument, success, error) => {
  return get(`/signin/${identityDocument}`).then(success).catch(error)
};

const enrollStudent = (studentData, success, error) => {
  post('/signup', studentData).then(success).catch(error)
};

const submitSurvey = (survey, success, error) => {
  post('/surveys', survey).then(success).catch(error)
};

export { authStudent, enrollStudent, submitSurvey};