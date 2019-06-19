import { getAsset } from './assets';
import { getCurrentState } from './state';
import {
  MAP_SIZE,
  PLAYER_HP,
  PLAYER_RADIUS,
  BULLET_RADIUS,
  CLIENT_UPDATE_INTERVAL,
} from '../constants';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
let renderInterval = null;

setCanvasDimensions();

export default function render() {
  const { others = [], me = {}, bullets = [] } = getCurrentState();
  if (Object.keys(me).length === 0) return;

  renderBackground(me);
  renderBorder(me);

  renderPlayer(me, me);
  bullets.forEach(bullet => renderBullet(me, bullet));
  others.forEach(otherPlayer => renderPlayer(me, otherPlayer));
}

function setCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function renderBorder({ x, y }) {
  context.stokeStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(canvas.width / 2 - x, canvas.height / 2 - y, MAP_SIZE, MAP_SIZE);
}

function renderBackground({ x = 0, y = 0 }) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 40,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'black');
  backgroundGradient.addColorStop(1, 'gray');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(me, otherPlayer) {
  const { x, y, hp, direction } = otherPlayer;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  context.drawImage(
    getAsset('ship.svg'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();

  /* render hp */
  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * hp / PLAYER_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - hp / PLAYER_HP),
    2,
  );
}

function renderBullet(me, bullet) {
  const { x, y } = bullet;

  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, CLIENT_UPDATE_INTERVAL);
}
