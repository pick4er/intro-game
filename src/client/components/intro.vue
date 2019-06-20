<template>
  <div :class="$style.menu">
    <input type="text" id="username-input" placeholder="Username" />
    <button @click="handleJoin" id="play-button">PLAY</button>
  </div>
</template>

<script>
  import { startPlaying } from '../index';

  export default {
    name: 'intro',
    methods: {
      handleJoin() {
        startPlaying(this.getUsername() || 'anonymous')
      },
      getUsername() {
        return document.getElementById('username-input').value
      }
    }
  }
</script>

<style module>
  .menu {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    padding: 20px 30px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    text-align: center;
  }

  .menu input {
    font-size: 18px;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
    padding: 3px;
    text-align: center;
  }

  .menu input:hover {
    outline: none;
  }
</style>
