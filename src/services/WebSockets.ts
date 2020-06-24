import io from 'socket.io-client';

import { Room, Location } from '../types/constants';

const serverUrl = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:5000'

interface WebSockets {
  socket: SocketIOClient.Socket
}

class WebSockets {
  constructor () {
    this.socket = io(serverUrl)

    this.socket.on('roomUsersUpdated', (message: any) => {
      console.log(message)
    })
    
    this.socket.on('error', (message: any) => {
      console.log(message)
    })
  }

  sendMessage (message: string) {
    return this.socket.emit('chatMessage', message)
  }

  createRoom (username: string, location: Location): Promise<string> {
    return new Promise((res) => {
      this.socket.emit('createRoom', username, location)

      this.socket.on('successfulCreate', (roomId: string) => res(roomId))
    })
  }

  joinRoom (roomId: string): Promise<Room> {
    return new Promise((res) => {
      this.socket.emit('joinRoom', roomId)

      this.socket.on('successfulJoin', (room: Room) => res(room))
    })
  }
}

const instance = new WebSockets()

export default instance
