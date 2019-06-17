const socketio = require('socket.io-client');

const { MSG_TYPES } = require('../constants');

const socket = socketio(
  `wss://${window.location.host}`,
  { reconnection: false },
);
const connectionPromise = new Promise(resolve => {
  socket.on(MSG_TYPES.CONNECT, () => {
    console.log('you are connected to server');
    resolve();
  });
});

connectionPromise.then(() => {
  socket.on(MSG_TYPES.JOIN, newPlayer => {
    console.log(`new player ${newPlayer} joined`);
  });
  socket.on(MSG_TYPES.DEAD, deadPlayer => {
    console.log(`player ${deadPlayer} is dead`);
  });
});
