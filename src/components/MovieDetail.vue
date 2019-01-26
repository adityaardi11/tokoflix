<template lang="pug">
  .wrapper
    h1 {{ movie_id }}
    hr
    div(v-if='!movie.title')
      img(src='https://loading.io/spinners/dual-ring/lg.dual-ring-loader.gif')
    div Judul : {{ movie.title }}
    div Url Poster : {{ movie.poster_path }}
    img(:src='"https://image.tmdb.org/t/p/w200"+movie.poster_path')
    div Rating : {{ movie.vote_average }}
    div Durasi : {{ movie.runtime }}
    div Harga : {{ movie.price }}

    hr
    h5 {{ casts }}
    



</template>

<script>
import axios from "axios";

export default {
  data() {
    console.log(this.$route);
    let movie_id = this.$route.params.movie_id;
    let slug = this.$route.params.slug;
    return {
      movie_id: movie_id,
      slug: slug,
      movie: {},
      casts: {}
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
      console.log(result.data);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
