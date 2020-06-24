import { User } from '../../types/constants';

export const SET_USER = 'SET_USER'
export const DELETE_USER = 'DELETE_USER'
export const UPDATE_USER = 'UPDATE_USER'

interface SetUserAction {
  type: typeof SET_USER
  payload: User
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
}

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: User 
};

export type UserActionTypes = SetUserAction | DeleteUserAction | UpdateUserAction
