const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = 5000;

const routes = require('./routes');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(routes);
app.use(cors());

server.listen(PORT);