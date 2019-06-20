import { RENDER_DELAY } from '../constants';
import { updateLeaderboard } from './leaderboard';

const updates = [];

export function processGameUpdate(update) {
  updates.push(update);
  const updateIndex = getUpdateIndex();
  updateLeaderboard(update.leaderboard);
  if (updateIndex > 0) {
    updates.splice(0, updateIndex);
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

export function getCurrentState() {
  const updateIndex = getUpdateIndex();
  const localTime = getLocalTime();

  if (updateIndex < 0 || updateIndex === updates.length - 1) {
    return updates[updates.length - 1] || {};
  } else {
    const baseUpdate = updates[updateIndex];
    const nextUpdate = updates[updateIndex + 1];
    const ratio = (
      (localTime - baseUpdate.timestamp) /
      (nextUpdate.timestamp - baseUpdate.timestamp)
    );

    return {
      me: interpolateObject(baseUpdate.me, nextUpdate.me, ratio),
      others: interpolateObjectArray(baseUpdate.others, nextUpdate.others, ratio),
      bullets: interpolateObjectArray(baseUpdate.bullets, nextUpdate.bullets, ratio),
    };
  }
}

function interpolateObjectArray(objects1, objects2, ratio) {
  return objects1.map(o => interpolateObject(o, objects2.find(o2 => o.id === o2.id), ratio));
}

function interpolateObject(object1, object2, ratio) {
  if (!object2) {
    return object1;
  }

  const interpolated = {};
  Object.keys(object1).forEach(key => {
    if (key === 'direction') {
      interpolated[key] = interpolateDirection(object1[key], object2[key], ratio);
    } else {
      interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
    }
  });
  return interpolated;
}

function interpolateDirection(d1, d2, ratio) {
  const absD = Math.abs(d2 - d1);
  if (absD >= Math.PI) {
    if (d1 > d2) {
      return d1 + (d2 + 2 * Math.PI - d1) * ratio;
    } else {
      return d1 - (d2 - 2 * Math.PI - d1) * ratio;
    }
  } else {
    return d1 + (d2 - d1) * ratio;
  }
}
