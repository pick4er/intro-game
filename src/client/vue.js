import Vue from 'vue';

import leaderboard from './components/leaderboard.vue';
import intro from './components/intro.vue';

const data = {
  leaderboard: [],
  shouldPlay: false,
};

export function updateLeaderboard(nextLeaderboard = []) {
  data.leaderboard = nextLeaderboard.map(({ username = 'anonymus', score }) => ({
    score,
    username: username.slice(0, 15),
  }));
}

export function changeShouldPlay(shouldPlay) {
  data.shouldPlay = shouldPlay;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    leaderboard,
    intro,
  },
  data,
});
/* eslint-enable no-new */
