import Vue from 'vue';

import leaderboard from './components/leaderboard.vue';
import intro from './components/intro.vue';
import gameover from './components/gameover.vue';

import { GAME_STATES } from '../constants';

const data = {
  leaderboard: [],
  gameState: GAME_STATES.CONNECT,
  username: 'anonymous',
};

export function updateLeaderboard(nextLeaderboard = []) {
  data.leaderboard = nextLeaderboard.map(({ username, score }) => ({
    score,
    username: (username || data.username).slice(0, 15),
  }));
}

export function changeGameState(nextGameState) {
  data.gameState = nextGameState;
}

export function changeUsername(nextUsername) {
  data.username = nextUsername;
}

export function getUsername() {
  return data.username;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    leaderboard,
    gameover,
    intro,
  },
  data,
});
/* eslint-enable no-new */
