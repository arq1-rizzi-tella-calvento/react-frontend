import { post } from './httpMethods'
// action types
export const SUBMIT_SURVEY = 'SUBMIT_SURVEY'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'

// action creators
export const submitSurvey = (survey) => {
  return dispatch => {
    post(`/surveys`, survey).then((data) => { console.log(data) })
  }
}