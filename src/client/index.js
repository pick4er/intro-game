import { connect } from './networking';
import { downloadAssets } from './assets';
import { startCapturingInput } from './input';
import { startRendering } from './render';

Promise.all([
  connect(),
  downloadAssets(),
]).then(() => {
  startCapturingInput();
  startRendering();
});
