import io from 'socket.io-client';

import { City, User, Restaurant, Message } from '../types/constants';
import isLocalhost from '../utils/isLocalhost';

const serverUrl = isLocalhost ? 'http://localhost:5000' : 'https://appetite-server.herokuapp.com'

interface WebSockets {
  socket: SocketIOClient.Socket
}

export type RoomUsers = {
  count: number;
  users: User[];
}

export type VoteResults = {
  users: User[];
  mostCommonRestaurants: Restaurant[];
  mostCommonCuisines: string [];
}

class WebSockets {
  constructor () {
    this.socket = io(serverUrl, { transports: ['websocket'], forceNew: true })
  }

  whenRoomUpdates (fn: (updatedRoom: RoomUsers) => any) {
    return this.socket.on('roomUsersUpdated', fn)
  }

  whenVoteIsFinished (fn: (voteResults: VoteResults) => any) {
    return this.socket.on('voteComplete', fn)
  }

  whenMessageHistoryUpdates (fn: (messageHistory: Message[]) => any) {
    return this.socket.on('messageHistoryUpdated', fn)
  }

  sendMessage (content: string) {
    return this.socket.emit('sendMessage', content)
  }

  getMessageHistory (): Promise<Message[]> {
    return new Promise((res, rej) => {
      this.socket.emit('getMessageHistory')

      this.socket.on('messageHistory', (messages: Message[]) => res(messages))

      this.socket.on('getMessageHistoryError', (message: string) => rej(new Error(message)))
    })
  }

  createRoom (username: string, city: City, cuisines: number[]): Promise<User> {
    return new Promise((res, rej) => {
      this.socket.emit('createRoom', username, city, cuisines)

      this.socket.on('successfulCreate', (user: User) => res(user))

      this.socket.on('createRoomError', (message: string) => rej(new Error(message)))
    })
  }

  joinRoom (roomId: string): Promise<User> {
    return new Promise((res, rej) => {
      this.socket.emit('joinRoom', roomId)

      this.socket.on('successfulJoin', (user: User) => res(user))

      this.socket.on('joinRoomError', (message: string) => rej(new Error(message)))
    })
  }

  setUsername (username: string): Promise<User> {
    return new Promise((res, rej) => {
      this.socket.emit('setUsername', username);

      this.socket.on('successfulSetUsername', (user: User) => res(user))

      this.socket.on('setUsernameError', (message: string) => rej(new Error(message)))
    })
  }

  updateSelection (restaurant: Restaurant): Promise<User> {
    return new Promise((res, rej) => {
      this.socket.emit('updateSelection', restaurant)

      this.socket.on('successfulUpdateSelection', (user: User) => res(user))

      this.socket.on('updateSelectionError', (message: string) => rej(new Error(message)))
    })
  }

  confirmSelection (): Promise<User> {
    return new Promise((res, rej) => {
      this.socket.emit('confirmSelection')

      this.socket.on('successfulConfirmSelection', (user: User) => res(user))
    })
  }
}

const instance = new WebSockets()

export default instance
