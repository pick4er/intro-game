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
  setTimeout(() => onJoin(socket), 300);
  socket.on(MSG_TYPES.DISCONNECT, onLeave);
}

const game = new Game();

function onJoin(socket) {
  game.addPlayer(socket);
}

function onLeave() {
  game.removePlayer(this);
}
