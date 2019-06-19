const {
  MSG_TYPES,
  MAP_WIDTH,
  MAP_HEIGHT,
  SERVER_UPDATE_INTERVAL,
} = require('../constants');

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    setInterval(this.update.bind(this), SERVER_UPDATE_INTERVAL);
  }

  addPlayer(socket) {
    this.sockets[socket.id] = socket;

    const x = MAP_WIDTH * Math.random();
    const y = MAP_HEIGHT * Math.random();
    const direction = Math.random() * 2 * Math.PI;

    this.players[socket.id] = {
      x,
      y,
      direction,
      id: socket.id,
    };
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleMove(socket, direction) {
    if (this.players[socket.id]) {
      const { dirX, dirY } = direction;
      const { x, y } = this.players[socket.id];
      const directionAngle = Math.atan2(dirX - x, y - dirY);

      this.players[socket.id].direction = directionAngle;
    }
  }

  update() {
    Object.keys(this.players).forEach(playerId => {
      const socket = this.sockets[playerId];
      socket.emit(
        MSG_TYPES.UPDATE,
        this.getUpdate(),
      );
    });
  }

  getUpdate() {
    return {
      players: Object.values(this.players),
      timestamp: Date.now(),
    };
  }
}

module.exports = Game;
