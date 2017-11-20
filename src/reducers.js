import { SUBMIT_SURVEY, SUBJECTS_SUMMARY } from './actions'

const initialState = { }

export default function app(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SURVEY:
      return Object.assign({}, state, {})
    case SUBJECTS_SUMMARY:
      return Object.assign({}, action.data, {loaded: true})
    default:
      return state
  }
}