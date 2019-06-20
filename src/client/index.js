import { connect, joinGame } from './networking';
import { downloadAssets } from './assets';
import { startCapturingInput, stopCapturingInput } from './input';
import { startRendering, stopRendering } from './render';
import { changeGameState } from './vue';
import { GAME_STATES } from '../constants';

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {});

function onGameOver() {
  changeGameState(GAME_STATES.DEAD);
  stopCapturingInput();
  stopRendering();
  console.log('game over');
}

export function startPlaying(username) {
  changeGameState(GAME_STATES.PLAYING);
  joinGame(username);
  startCapturingInput();
  startRendering();
}

export function restartPlaying(username) {
  changeGameState(GAME_STATES.PLAYING);
  joinGame(username);
  startCapturingInput();
  startRendering();
}
