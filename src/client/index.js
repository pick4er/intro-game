import { connect } from './networking';
import { downloadAssets } from './assets';
import { startCapturingInput, stopCapturingInput } from './input';
import { startRendering, stopRendering } from './render';
import './vue';

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  startCapturingInput();
  startRendering();
});

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  console.log('game over');
}
