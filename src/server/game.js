const {
  MSG_TYPES,
  MAP_WIDTH,
  MAP_HEIGHT,
  PLAYER_SPEED,
  SERVER_UPDATE_INTERVAL,
} = require('../constants');

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.lastUpdateTime = Date.now();
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
    const now = Date.now();
    const dt = now - this.lastUpdateTime;
    this.lastUpdateTime = now;

    Object.keys(this.players).forEach(playerId => {
      this.updatePlayerLocation(playerId, dt);
      const socket = this.sockets[playerId];
      socket.emit(
        MSG_TYPES.UPDATE,
        this.getUpdate(),
      );
    });
  }

  updatePlayerLocation(playerId, dt) {
    const { x: prevX, y: prevY, direction } = this.players[playerId];
    const distance = dt * PLAYER_SPEED;

    const nextX = prevX + distance * Math.sin(direction);
    const nextY = prevY - distance * Math.cos(direction);

    this.players[playerId].x = Math.max(0, Math.min(MAP_WIDTH, nextX));
    this.players[playerId].y = Math.max(0, Math.min(MAP_HEIGHT, nextY));
  }

  getUpdate() {
    return {
      players: Object.values(this.players),
      timestamp: Date.now(),
    };
  }
}

module.exports = Game;
