const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('create room', (roomID) => {
    socket.join(roomID);
  });

  socket.on('join room', (roomID) => {
    socket.join(roomID);
  });

  socket.on('play', () => {
    const roomID = Object.keys(socket.rooms)[1];
    io.to(roomID).emit('play');
  });

  socket.on('pause', () => {
    const roomID = Object.keys(socket.rooms)[1];
    io.to(roomID).emit('pause');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
