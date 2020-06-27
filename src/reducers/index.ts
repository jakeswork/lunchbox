import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';

import { User } from '../types/constants';
import user from './user';

const rootReducer = combineReducers({
  user
})

const store = createStore(
  rootReducer,
  /* preloadedState, */
  devToolsEnhancer({})
)

export interface State {
  user: User;
}

export default store;
