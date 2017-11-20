import { post, get } from './httpMethods'

// action types
export const SUBMIT_SURVEY = 'SUBMIT_SURVEY'
export const SUBJECTS_SUMMARY = 'SUBJECTS_SUMMARY'

// action creators
export const submitSurvey = (survey) => {
  return dispatch => {
    post('/surveys', survey).then((data) => { console.log(data) })
  }
}

export const getSubjectsSummary = () => {
  return dispatch => {
    get('/summary').then((data) => {
      dispatch({data: data, type: 'SUBJECTS_SUMMARY'})
    })
  }
}