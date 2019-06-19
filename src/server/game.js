const shortid = require('shortid');
const {
  MSG_TYPES,
  MAP_SIZE,
  PLAYER_HP,
  PLAYER_SPEED,
  PLAYER_RADIUS,
  BULLET_RADIUS,
  BULLET_SPEED,
  BULLET_DAMAGE,
  BULLET_HIT_SCORE,
  FIRE_COOLDOWN,
  FIRE_STEP,
  SERVER_UPDATE_INTERVAL,
} = require('../constants');


function updatePlayerLocation(player, dt) {
  const { x: prevX, y: prevY, direction } = player;
  const distance = dt * PLAYER_SPEED;

  const nextX = prevX + distance * Math.sin(direction);
  const nextY = prevY - distance * Math.cos(direction);

  /* eslint-disable no-param-reassign */
  player.x = Math.max(0, Math.min(MAP_SIZE, nextX));
  player.y = Math.max(0, Math.min(MAP_SIZE, nextY));
  /* eslint-enable no-param-reassign */
}

function updateBulletLocation(bullet, dt) {
  const { x, y, direction } = bullet;
  const distance = dt * BULLET_SPEED;

  /* eslint-disable no-param-reassign */
  bullet.x = x + distance * Math.sin(direction);
  bullet.y = y - distance * Math.cos(direction);
  /* eslint-enable no-param-reassign */
}


function emitNewBullet(player) {
  const { id: parentId, x, y, direction } = player;
  return {
    x,
    y,
    parentId,
    direction,
    id: shortid(),
  };
}

function shouldDestroyBullet({ x, y }) {
  return (
    x < 0 || x > MAP_SIZE || y < 0 || y > MAP_SIZE
  );
}

function shouldSaveBullet(bullet) {
  return !shouldDestroyBullet(bullet);
}

function applyCollisions(players, bullets) {
  const hitBullets = [];
  bullets.forEach(bullet => {
    const hitPlayer = players.find(player => (
      bullet.parentId !== player.id &&
      getDistanceBetween(player, bullet) <= PLAYER_RADIUS + BULLET_RADIUS
    ));

    if (hitPlayer) {
      hitBullets.push(bullet);
      hitPlayer.hp -= BULLET_DAMAGE;
    }
  });

  return hitBullets;
}

function getDistanceBetween(object1, object2) {
  const { x: x1, y: y1 } = object1;
  const { x: x2, y: y2 } = object2;

  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt((dx ** 2) + (dy ** 2));
}

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.bullets = [];
    this.fireCooldown = 0;
    this.lastUpdateTime = Date.now();
    setInterval(this.update.bind(this), SERVER_UPDATE_INTERVAL);
  }

  addPlayer(socket) {
    this.sockets[socket.id] = socket;

    const x = MAP_SIZE * Math.random();
    const y = MAP_SIZE * Math.random();
    const direction = Math.random() * 2 * Math.PI;

    this.players[socket.id] = {
      x,
      y,
      direction,
      score: 0,
      id: socket.id,
      hp: PLAYER_HP,
    };
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleMove(socket, direction) {
    if (this.players[socket.id]) {
      const { dirX, dirY } = direction;
      const directionAngle = Math.atan2(dirX, dirY);

      this.players[socket.id].direction = directionAngle;
    }
  }

  update() {
    const now = Date.now();
    const dt = now - this.lastUpdateTime;
    this.lastUpdateTime = now;

    this.bullets.forEach(
      bullet => updateBulletLocation(bullet, dt),
    );
    this.bullets = this.bullets.filter(shouldSaveBullet);

    /* count hit bullets */
    const hitBullets = applyCollisions(
      Object.values(this.players), this.bullets,
    );
    hitBullets.forEach(bullet => {
      if (this.players[bullet.parentId]) {
        this.players[bullet.parentId].score += BULLET_HIT_SCORE;
      }
    });
    this.bullets = this.bullets.filter(
      bullet => !hitBullets.includes(bullet),
    );

    Object.keys(this.players).forEach(playerId => {
      const player = this.players[playerId];
      const socket = this.sockets[playerId];
      updatePlayerLocation(player, dt);

      if (this.fireCooldown <= 0) {
        this.bullets.push(emitNewBullet(player, dt));
      }

      if (player.hp <= 0) {
        socket.emit(MSG_TYPES.DEAD);
        this.removePlayer(socket);
      }
    });

    if (this.fireCooldown <= 0) this.fireCooldown += FIRE_COOLDOWN;
    else this.fireCooldown -= FIRE_STEP;

    Object.keys(this.players).forEach(playerId => {
      const socket = this.sockets[playerId];
      socket.emit(
        MSG_TYPES.UPDATE,
        this.getUpdate(playerId),
      );
    });
  }

  getUpdate(playerId) {
    const others = Object.values(this.players).filter(
      ({ id }) => id !== playerId,
    );

    return {
      others,
      me: this.players[playerId],
      timestamp: Date.now(),
      bullets: this.bullets,
    };
  }
}

module.exports = Game;
