import { SUBMIT_SURVEY } from './actions'

const initialState = { }

export default function app(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SURVEY:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}