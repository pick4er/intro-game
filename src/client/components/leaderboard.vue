<template>
  <table :class="$style.table">
    <tr>
      <th>Username</th>
      <th>Score</th>
    </tr>
    <tr v-for="player in leaderboard">
      <td>{{ player.username }}</td>
      <td>{{ player.score }}</td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: 'leaderboard',
    props: ['leaderboard'],
  }
</script>

<style module>
  .table {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 5px;
  }

  .table th {
    text-align: center;
    padding: 2px 5px;
  }

  .table td {
    text-align: center;
    padding: 2px 5px;
  }
</style>
