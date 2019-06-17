const { MSG_TYPES, MAP_WIDTH, MAP_HEIGHT } = require('../constants');

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
  }

  addPlayer(socket) {
    this.sockets[socket.id] = socket;

    const x = MAP_WIDTH * Math.random();
    const y = MAP_HEIGHT * Math.random();
    const direction = Math.random() * 2 * Math.PI;

    this.players[socket.id] = {
      x, y, direction,
    };

    const update = this.getUpdate();
    Object.keys(this.sockets).forEach(socketId => {
      const playerSocket = this.sockets[socketId];
      playerSocket.emit(MSG_TYPES.UPDATE, update);
    });
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];

    const update = this.getUpdate();
    Object.keys(this.sockets).forEach(socketId => {
      const playerSocket = this.sockets[socketId];
      playerSocket.emit(MSG_TYPES.UPDATE, update);
    });
  }

  getUpdate() {
    return {
      players: Object.values(this.players),
    };
  }
}

module.exports = Game;
