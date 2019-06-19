import { updateDirection } from './networking';

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function handleInput(x, y) {
  const dirX = x - window.innerWidth / 2;
  const dirY = window.innerHeight / 2 - y;
  updateDirection({ dirX, dirY });
}

export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
}
