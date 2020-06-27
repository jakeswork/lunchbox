import { Room } from '../../types/constants';

export const SET_USER = 'SET_USER'
export const DELETE_USER = 'DELETE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_USER_ROOM = 'SET_USER_ROOM'

export type OptionalUserPayload = {
  id?: string;
  username?: string;
  room?: Room;
}

export interface SetUserAction {
  type: typeof SET_USER
  payload: OptionalUserPayload
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: OptionalUserPayload; 
};

export interface SetUserRoomAction {
  type: typeof SET_USER_ROOM
  payload: Room
}

export type UserActionTypes = SetUserAction | DeleteUserAction | UpdateUserAction | SetUserRoomAction
