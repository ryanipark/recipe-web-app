import { SET_USER } from './types'
// Top/root level reducer
const startingState = {}

function rootReducer(state = startingState, action) {
  // Switch to handle updates to the state
  switch(action.type) {
    case SET_USER:
        return {
            ...state,
            user: action.payload,
        };
    default:
      return state;
  }
}

export default rootReducer;
