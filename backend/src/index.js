const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = 3333;

const { addUser, removeUser, getUser } = require('./Helpers/user');

const routes = require('./routes');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('login', ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.username}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.username} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.username, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.username} has left.` });
      io.to(user.room).emit('roomData', { room: user.room });
    }
  })
});

app.use(routes);
app.use(cors());

server.listen(PORT);