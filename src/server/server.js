/* eslint-disable import/no-extraneous-dependencies, global-require */
const express = require('express');
const socketio = require('socket.io');

const Game = require('./game');
const { MSG_TYPES } = require('../constants');

const app = express();
app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../../webpack-configs/dev');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  app.use(express.static('dist'));
}

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

const io = socketio(server);
io.on(MSG_TYPES.CONNECT, onPlayerConnection);

function onPlayerConnection(socket) {
  addSocket(socket);
  socket.on(MSG_TYPES.DISCONNECT, onLeave);
  socket.on(MSG_TYPES.MOVE, onMove);
  socket.on(MSG_TYPES.JOIN, onJoin);
}

const game = new Game();

function addSocket(socket) {
  game.addSocket(socket);
}

function onJoin(username) {
  game.addPlayer(this, username);
}

function onLeave() {
  game.removePlayer(this);
}

function onMove(direction) {
  game.handleMove(this, direction);
}
