import { SET_USER, UserActionTypes, DELETE_USER, UPDATE_USER, SET_USER_ROOM } from './types';

const defaultState = {
  username: '',
  id: '',
  room: {
    id: '',
    city: {
      id: '',
      name: ''
    },
    cuisines: []
  },
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

    case SET_USER_ROOM:
      return {
        ...state,
        room: action.payload
      }

    default: return state
  }
}
