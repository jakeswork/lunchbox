import io from 'socket.io-client';

const serverUrl = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:5000'

interface WebSockets {
  socket: SocketIOClient.Socket
}

class WebSockets {
  constructor () {
    this.socket = io(serverUrl)

    this.socket.on('roomUsers', (message: any) => {
      console.log(message)
    })
    
    this.socket.on('error', (message: any) => {
      console.log(message)
    })
  }

  sendMessage (message: string) {
    return this.socket.emit('chatMessage', message)
  }

  createRoom (username: string, cityId: number): Promise<string> {
    return new Promise((res) => {
      this.socket.emit('createRoom', username, cityId)

      this.socket.on('successfulCreate', (roomId: string) => res(roomId))
    })
  }

  joinRoom (username: string, roomId: string) {
    return this.socket.emit('joinRoom', username, roomId)
  }
}

const instance = new WebSockets()

export default instance
