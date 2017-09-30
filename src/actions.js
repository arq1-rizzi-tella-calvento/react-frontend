import { post } from './httpMethods'
// action types
export const SUBMIT_SURVEY = 'SUBMIT_SURVEY'

// action creators
export const submitSurvey = (survey) => {
  return dispatch => {
    post('http://localhost:3000/surveys', survey).then((data) => { console.log(data) })
  }
}