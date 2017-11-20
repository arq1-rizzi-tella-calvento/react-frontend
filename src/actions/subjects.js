import { post, get } from '../httpMethods.js';

const allSubjects = (success) => { get('/signup/subjects').then(success); }

const surveyOptions = (userId, success, error) => {
    return get(`/surveys/${userId}/new`).then(success).catch(error)
};

const submitSurvey = (survey, success, error) => {
    post('/surveys', survey).then(success).catch(error)
};

export { allSubjects, surveyOptions, submitSurvey };