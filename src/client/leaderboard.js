import Vue from 'vue';

const data = {
  leaderboard: [],
};

export function updateLeaderboard(nextLeaderboard = []) {
  data.leaderboard = nextLeaderboard.map(({ username = 'anonymus', score = '25' }) => ({
    score,
    username: username.slice(0, 15) || 'Anonymous',
  }));
}

const leaderboard = new Vue({
  el: '#leaderboard',
  data,
});

export default leaderboard;
