import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dx: 0,
    dy: 0,
    dxtmp: 0,
    dytmp: 0,
    body_snake: [[3,2],[3,3],[3,4]],
    board: [],
    index_meal: [],
    game_over: false,
    score: 0,
    title: "SNAKE GAME",
    game_over_message: "",
    scores: [],
    game_number: 0
  },
  mutations: {
    clearBoard(state) {
      for(var i = 0; i < 16; i++)
        for(var j = 0; j < 16; j++)
          state.board[i][j] = 0;
      this.commit("uploadIndexMeal");
      state.score = 0;
    },
    uploadIndexMeal(state) {
      while(true) {
        var idx_cell_rand = Math.floor(Math.random()*16*16);
        var ix = Math.floor(idx_cell_rand/16);
        var iy = idx_cell_rand % 16;
        if ( state.board[ix][iy] == 0 ) {
          state.index_meal = [ix, iy];
          break;
        }
      }
    },
    keyup(state, event) {
      console.log(event.keyCode)
      if (event.keyCode == 32) {
        state.game_over = false;
        this.commit("clearBoard");
        state.body_snake = [[3,2],[3,3],[3,4]];
      }
      if (event.keyCode == 38) { //up
        if ( state.dx == 0 ) {
          state.dxtmp = -1;
          state.dytmp = 0;
        }
      }
      if (event.keyCode == 39) { //right
        if ( state.dy == 0 ) {
          state.dxtmp = 0;
          state.dytmp = 1;
        }
      }
      if (event.keyCode == 40) { //down
        if ( state.dx == 0 ) {
          state.dxtmp = 1;
          state.dytmp = 0;
        }
      }
      if (event.keyCode == 37) { //left
        if ( state.dy == 0 ) {
          state.dxtmp = 0;
          state.dytmp = -1;
        }
      }
    },
    walk(state, dxx, dyy) {
      var dx = state.dx;
      var dy = state.dy;
      if (dx != 0 || dy != 0 ) {
        var bs = state.body_snake;

        var is = bs[bs.length - 1];
        var ihead_snake = new Array()
        ihead_snake.push(is[0])
        ihead_snake.push(is[1])
        ihead_snake[0] += dx;
        ihead_snake[1] += dy;

        if ( ihead_snake[0] < 0 || ihead_snake[0] > 15 || ihead_snake[1] < 0 || ihead_snake[1] > 15 ) {
          this.commit("gameOver");
        } else {
          state.body_snake.push(ihead_snake);
          if ( ihead_snake[0] != state.index_meal[0] || ihead_snake[1] != state.index_meal[1] ) { //
            var tail = state.body_snake.shift()
            state.board[tail[0]][tail[1]] = 0
          } else {
            this.commit("uploadIndexMeal")
            state.score += 1;
          }
        }
      }
    },
    gameOver(state) {
      var self = state;
      state.game_number++;
      state.scores.push({
        name: 'Player ' + self.game_number,
        score: self.score
      });
      state.scores.sort(function (a, b) {
        return b.score - a.score;
      });
      state.game_over = true;
      state.game_over_message = "SCORE LIST";
      state.dx = 0;
      state.dy = 0;
      state.dxtmp = 0;
      state.dytmp = 0;
      console.log(state.scores)
    },
    upload(state) {
      state.dx = state.dxtmp;
      state.dy = state.dytmp;
      this.commit("walk",state.dx, state.dy);
    },
    play() {
      const self = this;
      setInterval(function () {
        self.commit('upload');
      }, 300);
    }
  },
  actions: {

  }
})
