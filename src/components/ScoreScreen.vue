<template>
  <div>
  <header class="header">{{title}}</header>
  <div :class="{over: game_over}" v-show="game_over">
    <div :class="{main_over: game_over}">
      <table class="table" style="width:100%">
        <tbody>
          <tr v-for="game in scores">
            <td class="scoreIcon" style="width:10%"></td>
            <td style="width:20%">{{game.name}}</td>
            <td style="width:45%"></td>
            <td style="width:10%">{{game.score}}</td>
          </tr>
        </tbody>
      </table>
      <div>space to continue</div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'ScoreScreen',
  computed: {
    ...mapState([
      'title',
      'game_over',
      'scores'
    ])
  }
}
</script>


<style >
  .over {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #333;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: 'Rubik', sans-serif;
    -webkit-font-smoothing: antialiased;
    z-index: 3;
  }
  .main_over {
    position: absolute;
    top: 1;
    left: 1;
    right: 1;
    bottom: 1;
    width: 50%;
    background-color: #FFF;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: 'Rubik', sans-serif;
    -webkit-font-smoothing: antialiased;
    z-index: 3;
  }
  .table: {
    position: absolute;
    width: 100%;
  }
  .screen: {
    font-family: 'Rubik', sans-serif;
  }
  .scoreIcon {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: 1px solid #e9e9e9;
    background: gray
  }
  .tdx {
    height: 50%;
    text-align: left;
  }
</style>
