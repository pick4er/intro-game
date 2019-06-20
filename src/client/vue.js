import Vue from 'vue';
import leaderboard from './components/leaderboard.vue';

const data = {
  leaderboard: [],
};

/* eslint-disable import/prefer-default-export */
export function updateLeaderboard(nextLeaderboard = []) {
  data.leaderboard = nextLeaderboard.map(({ username = 'anonymus', score }) => ({
    score,
    username: username.slice(0, 15),
  }));
}
/* eslint-enable import/prefer-default-export */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    leaderboard,
  },
  data,
});
/* eslint-enable no-new */
