import { post, get, put } from '../httpMethods.js';

const allSubjects = (success) => { get('/signup/subjects').then(success); }

const surveyOptions = (token, success, error) => {
    return get(`/surveys/${token}/new`).then(success).catch(error)
};

const editSurvey = (token, success, error) => {
  return get(`/surveys/${token}/edit`).then(success).catch(error)
};

const submitSurvey = (survey, success, error) => {
  post('/surveys', survey).then(success).catch(error)
};

const updateSurvey = (survey, success, error) => {
  return put(`/surveys/${survey.token}`, survey).then(success).catch(error)
};

export { allSubjects, surveyOptions, submitSurvey, editSurvey, updateSurvey };