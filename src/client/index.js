import socketio from 'socket.io-client';

import render from './render';
import { downloadAssets } from './assets';
import { processGameUpdate } from './state';
import { MSG_TYPES } from '../constants';

const location = process.env.NODE_ENV === 'production' ?
  `wss://${window.location.host}` :
  `ws://${window.location.host}`;

const socket = socketio(
  location,
  { reconnection: false },
);

function connect() {
  return new Promise(resolve => {
    socket.on(MSG_TYPES.CONNECT, () => {
      console.log('you are connected to server');
      resolve();
    });
  });
}

Promise.all([
  connect(),
  downloadAssets(),
]).then(() => {
  socket.on(MSG_TYPES.UPDATE, onUpdate);
  socket.on(MSG_TYPES.DEAD, onUpdate);
});


function onUpdate(update) {
  processGameUpdate(update);
  render();
}
