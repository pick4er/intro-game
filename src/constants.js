module.exports = Object.freeze({
  MAP_SIZE: 3000,
  MAP_WIDTH: 1000,
  MAP_HEIGHT: 600,
  PLAYER_RADIUS: 20,
  PLAYER_SPEED: 0.3,
  CLIENT_UPDATE_INTERVAL: 17,
  SERVER_UPDATE_INTERVAL: 51,
  RENDER_DELAY: 200,
  MSG_TYPES: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    JOIN: 'join',
    UPDATE: 'update',
    DEAD: 'dead',
    MOVE: 'move',
  },
});
