import { SET_USER, UserActionTypes, DELETE_USER, UPDATE_USER } from './types';

const defaultState = {
  username: '',
  id: '',
  room: '',
};

export default (state = defaultState, action: UserActionTypes) => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      }
    
    case DELETE_USER:
      return defaultState
    
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload
      }

    default: return state
  }
}
