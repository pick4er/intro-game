import socketio from 'socket.io-client';
import throttle from 'lodash.throttle';
import { MSG_TYPES } from '../constants';
import { processGameUpdate } from './state';
import render from './render';

const location = process.env.NODE_ENV === 'production' ?
  `wss://${window.location.host}` :
  `ws://${window.location.host}`;

const socket = socketio(location, { reconnection: false });

export function connect() {
  return new Promise(resolve => {
    socket.on(MSG_TYPES.CONNECT, () => {
      console.log('you are connected to server');
      resolve();
    });
  }).then(() => {
    socket.on(MSG_TYPES.UPDATE, onUpdate);
  });
}

export const updateDirection = throttle(direction => {
  socket.emit(MSG_TYPES.MOVE, direction);
}, 50);

function onUpdate(update) {
  processGameUpdate(update);
  render();
}
