const { MSG_TYPES } = require('../constants');

class Game {
  constructor() {
    this.sockets = {};
  }

  addPlayer(socket) {
    this.sockets[socket.id] = socket;
    Object.keys(this.sockets).forEach(socketId => {
      if (socketId === socket.id) return;

      const playerSocket = this.sockets[socketId];
      playerSocket.emit(MSG_TYPES.JOIN, socket.id);
    });
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    Object.keys(this.sockets).forEach(socketId => {
      const playerSocket = this.sockets[socketId];
      playerSocket.emit(MSG_TYPES.DEAD, socket.id);
    });
  }
}

module.exports = Game;
