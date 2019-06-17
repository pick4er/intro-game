const express = require('express');
const socketio = require('socket.io');

const Game = require('./game');
const { MSG_TYPES } = require('../constants');

const app = express();
app.use(express.static('dist'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

const io = socketio(server);
io.on(MSG_TYPES.CONNECT, onPlayerConnection);

function onPlayerConnection(socket) {
  onJoin(socket)
  socket.on(MSG_TYPES.DISCONNECT, onLeave);
}

const game = new Game();

function onJoin(socket) {
  game.addPlayer(socket);
}

function onLeave() {
  game.removePlayer(this);
}
