import io from 'socket.io-client';

import { Room, City, User } from '../types/constants';

const serverUrl = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:5000'

interface WebSockets {
  socket: SocketIOClient.Socket
}

export type RoomUsers = {
  count: number;
  room: Room;
  users: User[];
}

class WebSockets {
  constructor () {
    this.socket = io(serverUrl)
  }

  onRoomUsersUpdate (fn: (updatedRoom: RoomUsers) => any): void {
    this.socket.on('roomUsersUpdated', (e: RoomUsers) => fn(e))
  }

  sendMessage (message: string): void {
    this.socket.emit('chatMessage', message)
  }

  createRoom (username: string, city: City): Promise<string> {
    return new Promise((res, rej) => {
      this.socket.emit('createRoom', username, city)

      this.socket.on('successfulCreate', (roomId: string) => res(roomId))

      this.socket.on('createRoomError', (message: string) => rej(message))
    })
  }

  joinRoom (roomId: string): Promise<Room> {
    return new Promise((res, rej) => {
      this.socket.emit('joinRoom', roomId)

      this.socket.on('successfulJoin', (room: Room) => res(room))

      this.socket.on('joinRoomError', (message: string) => rej(message))
    })
  }
}

const instance = new WebSockets()

export default instance
