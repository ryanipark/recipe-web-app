import { SET_USER , LOGOUT_USER } from './types'
// Top/root level reducer
const startingState = {}

function rootReducer(state = startingState, action) {
  // Switch to handle updates to the state
  switch(action.type) {
    case SET_USER:
        return {
            ...state,
            user: {
              username: action.payload.username,
              email: action.payload.email,
              created_at: action.payload.created_at
            }
        };
      case LOGOUT_USER:
        return {
            ...state,
            user: undefined,
        };
    default:
      return state;
  }
}

export default rootReducer;
