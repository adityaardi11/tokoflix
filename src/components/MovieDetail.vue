<template lang="pug">
  .wrapper
    div(v-if='!movie.title')
      img(src='https://loading.io/spinners/dual-ring/lg.dual-ring-loader.gif')
    div Judul : {{ movie.title }}
    img(:src='"https://image.tmdb.org/t/p/w200"+movie.poster_path')

    div Rating : {{ movie.vote_average }}
    div Durasi : {{ movie.runtime }} menit
    div Harga : {{ movie.price }}
    hr
    div(v-if='$store.getters.getOwnedMovieStatus(movie.id)') Sudah dimiliki
    div(v-else)
      div Belum dimiliki
      div(@click='$store.dispatch("userBuyMovie", movie)').buy-button Beli
    hr
    h3 Cast
    div.cast-wrapper
      div(v-for='c in casts.cast').cast
        div {{ c.name }} sebagai {{ c.character }}
        div(v-if='c.profile_path')
          img(:src="'https://image.tmdb.org/t/p/w200'+c.profile_path")
    hr
    h3 Similar Movies
    div.cast-wrapper
      div(v-for='s in similar').cast
        div(v-if='s.poster_path')
          img(:src="'https://image.tmdb.org/t/p/w200'+s.poster_path")
    hr
    h3 Recommended Movies
    div.cast-wrapper
      div(v-for='r in recommended').cast
        div(v-if='r.poster_path')
          img(:src="'https://image.tmdb.org/t/p/w200'+r.poster_path")




</template>

<script>
import axios from "axios";

export default {
  data() {
    let movie_id = this.$route.params.movie_id;
    let slug = this.$route.params.slug;
    return {
      movie_id: movie_id,
      slug: slug,
      movie: {},
      casts: {},
      similar: {},
      recommended: {}
    };
  },
  mounted() {
    let api_key = "c339c6904bbd2182624e925c40f9ee8e";
    let movie_detail_url =
      "https://api.themoviedb.org/3/movie/" +
      this.movie_id +
      "?api_key=" +
      api_key;
    let casts_url =
      "https://api.themoviedb.org/3/movie/" +
      this.movie_id +
      "/credits?api_key=" +
      api_key;
    let similar_url =
      "https://api.themoviedb.org/3/movie/" +
      this.movie_id +
      "/similar?api_key=" +
      api_key;

    let recommended_url =
      "https://api.themoviedb.org/3/movie/" +
      this.movie_id +
      "/recommendations?api_key=" +
      api_key;

    let vm = this;
    axios.get(movie_detail_url).then(function(result) {
      vm.movie = result.data;
      if (vm.movie.vote_average < 3) vm.movie.price = 3500;
      else if (vm.movie.vote_average >= 3 && vm.movie.vote_average < 6)
        vm.movie.price = 8250;
      else if (vm.movie.vote_average >= 6 && vm.movie.vote_average < 8)
        vm.movie.price = 16350;
      else if (vm.movie.vote_average >= 8 && vm.movie.vote_average < 10)
        vm.movie.price = 21250;
    });
    axios.get(casts_url).then(function(result) {
      vm.casts = result.data;
    });
    axios.get(similar_url).then(function(result) {
      vm.similar = result.data.results;
    });
    axios.get(recommended_url).then(function(result) {
      vm.recommended = result.data.results;
      // console.log(result.data);
    });
  }
};
</script>

<style lang="scss" scoped>
.cast-wrapper {
  overflow-x: scroll;
  white-space: nowrap;
}
.cast {
  display: inline-block;
  width: 300px;
  white-space: pre-wrap;
}
.buy-button {
  cursor: pointer;
  padding: 1rem 2rem;
  border: 1px solid black;
  border-radius: 3px;
  width: 2rem;
  display: flex;
  justify-items: center;
  margin: 0 auto;
  &:hover {
    background: black;
    color: white;
  }
}
</style>
