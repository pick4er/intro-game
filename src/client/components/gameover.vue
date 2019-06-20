<template>
  <div :class="$style.modal">
    <p>Game over!</p>
    <button @click="tryAgain" id="try-again-button">TRY AGAIN</button>
  </div>
</template>

<script>
  import {restartPlaying} from "../index";
  import {getUsername} from "../vue";

  export default {
    name: 'gameover',
    methods: {
      tryAgain() {
        restartPlaying(getUsername())
      }
    }
  }
</script>

<style module>
  .modal {
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
</style>
