import { connect, joinGame } from './networking';
import { downloadAssets } from './assets';
import { startCapturingInput, stopCapturingInput } from './input';
import { startRendering, stopRendering } from './render';
import { changeShouldPlay } from './vue';

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {});

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  console.log('game over');
}

/* eslint-disable import/prefer-default-export */
export function startPlaying(username) {
  joinGame(username);
  changeShouldPlay(true);
  startCapturingInput();
  startRendering();
}
