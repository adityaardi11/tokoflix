import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    cash: 100000,
    movies_owned: {}
  },
  mutations: {
    userBuyMovie(state, movie) {
      Vue.set(state.movies_owned, movie.id, {
        date_added: new Date(),
        content: movie
      });
      state.cash -= movie.price;
      Swal.fire("Berhasil", "Pembelian berhasil dilakukan", "success");
    }
  },
  actions: {
    userBuyMovie({ commit }, movie) {
      commit("userBuyMovie", movie);
    }
  },
  getters: {
    getCashDisplay: state => {
      return new Intl.NumberFormat("id", {
        style: "currency",
        currency: "IDR"
      }).format(state.cash);
    },
    getMoviesOwned: state => {
      return _.chain(state.movies_owned)
        .sortBy(function(row, key) {
          return row.date_added * -1;
        })
        .map(function(row, key) {
          return row.content;
        })
        .value();
    },
    getOwnedMovieStatus: state => movie_id => {
      return _.has(state.movies_owned, movie_id);
    },
    getMoviesOwnedCount: state => {
      return _.size(state.movies_owned);
    }
  }
});
