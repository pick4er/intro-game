
const updates = [];

export function processGameUpdate(update) {
  updates.push(update);
}

export function getCurrentState() {
  return updates[updates.length - 1];
}
