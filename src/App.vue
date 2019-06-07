<template>
  <div id="app" tabindex="-1" @keyup="keyup">
    <GameBoard></GameBoard>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue'
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'app',
  methods: {
    ...mapMutations([
        'keyup'
    ])
  },
  components: {
    GameBoard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
