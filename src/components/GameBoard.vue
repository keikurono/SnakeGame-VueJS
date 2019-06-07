<template>
  <div>
  <main class="main">{{printMeal}}{{printSnake}}
    <ScoreScreen></ScoreScreen>
    <div class="grid">
      <div v-for="(index, i) in 16" class="row">
        <div v-for="(index, j) in 16" :class="{
          nothing: board[i][j]==0,
          headSnake: board[i][j]==1,
          bodySnake: board[i][j]==2,
          mealSnake: board[i][j]==3
        }">
        </div>
      </div>
    </div>

    <footer class="header">score: {{score}}</footer>
  </main>
  </div>
</template>

<script>
import ScoreScreen from './ScoreScreen.vue';
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'GameBoard',
  computed: {
    ...mapState([
      'dx',
      'dy',
      'dxtmp',
      'dytmp',
      'body_snake',
      'board',
      'index_meal',
      'game_over',
      'score',
      'title',
      'game_over_message',
      'scores',
      'game_number'
    ]),
    is_gover() {
      return this.$store.state.game_over;
    },
    get_score(){
      return this.$store.state.score;
    },
    printMeal() {
      var imeal = this.index_meal;
      if ( imeal.length ) {
        this.board[imeal[0]][imeal[1]] = 3
      }
      return null;
    },
    printSnake() {
      var body_snake = this.body_snake
      for (var ibody of body_snake) {
        this.board[ibody[0]][ibody[1]] = 2;
      }
      this.board[ibody[0]][ibody[1]] = 1;
      return null;
    }
  },
  beforeMount() {
    for(var i = 0; i < 16; i++)
      this.$store.state.board.push(new Array(16).fill(0));
    this.uploadIndexMeal();
  },
  mounted() {
    this.play();
  },
  methods: {
    ...mapMutations([
      'clearBoard',
      'uploadIndexMeal',
      'play',
      'keyup',
      'walk',
      'gameOver',
      'upload'
    ]),
  },
  components: {
    ScoreScreen
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main {
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 0;
}
.grid {
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #333;
}
.row {
    border-top: 1px solid #e9e9e9;
    display: flex;
}
.nothing {
  height: 35px;
  width: 35px;
  border: 1px solid #e9e9e9;
  background-color: white;
}
.headSnake {
  height: 35px;
  width: 35px;
  border: 1px solid #e9e9e9;
  background-image: url(../assets/zoo2.png);
  background-size: 100% 100%;
}
.bodySnake {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid #e9e9e9;
  background: #9F7267
}
.mealSnake {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid #e9e9e9;
  background-image: url(../assets/food.png);
  background-size: 100% 100%;
}
.header {
  text-align: center;
  padding: 12px 0;
  font-family: 'Rubik', sans-serif;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
