module.exports = Object.freeze({
  PLAYER_HP: 100,
  MAP_SIZE: 3000,
  MAP_WIDTH: 1000,
  MAP_HEIGHT: 600,
  PLAYER_RADIUS: 20,
  PLAYER_SPEED: 0.3,
  BULLET_SPEED: 0.6,
  BULLET_RADIUS: 3,
  BULLET_DAMAGE: 10,
  BULLET_HIT_SCORE: 10,
  CLIENT_UPDATE_INTERVAL: 17,
  SERVER_UPDATE_INTERVAL: 51,
  RENDER_DELAY: 200,
  FIRE_COOLDOWN: 1,
  FIRE_STEP: 0.2,
  MSG_TYPES: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    JOIN: 'join',
    UPDATE: 'update',
    DEAD: 'dead',
    MOVE: 'move',
  },
});
