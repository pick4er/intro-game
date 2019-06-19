import { RENDER_DELAY } from '../constants';

const updates = [];

export function processGameUpdate(update) {
  updates.push(update);
  const updateIndex = getUpdateIndex();
  if (updateIndex > 0) {
    updates.splice(0, updateIndex);
  }
}

export function getCurrentState() {
  const updateIndex = getUpdateIndex();
  if (updateIndex < 0 || updateIndex === updates.length - 1) {
    return updates[updates.length - 1] || {};
  } else {
    return updates[updateIndex];
  }
}

function getLocalTime() {
  return Date.now() - RENDER_DELAY;
}

function getUpdateIndex() {
  const localTime = getLocalTime();
  for (let i = updates.length - 1; i >= 0; i--) {
    if (updates[i].timestamp <= localTime) return i;
  }
  return -1;
}
