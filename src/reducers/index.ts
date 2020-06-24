import { createStore, combineReducers } from 'redux';

import { User } from '../types/constants';
import user from './user';

const rootReducer = combineReducers({
  user
})

const store = createStore(rootReducer)

export interface State {
  user: User;
}

export default store;
