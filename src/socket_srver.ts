import express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app)
import { Server } from 'socket.io'
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', ()=> {
    console.log('user disconnect')
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
})