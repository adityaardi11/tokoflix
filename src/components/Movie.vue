<template>
  <div class="movie-main">
    <div class="movie-wrapper" v-for="m in movies" :key="m.title">
      <img :src="'https://image.tmdb.org/t/p/w200' + m.poster_path" alt>
      <!-- <img :src="'https://image.tmdb.org/t/p/w200' + m.backdrop_path" alt> -->
      <div class="movie-title">
        <router-link :to="{name : 'MovieDetail', params : {movie_id : m.id, slug:m.slug}}">
          <b>{{ m.title }}</b>
        </router-link>
      </div>
      <div>Rating : {{ m.vote_average ? m.vote_average : "-" }}</div>
      <div>Harga : {{ m.price }}</div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import slug from "slug";

export default {
  data() {
    return {
      movies: [],
      results: null
    };
  },
  mounted() {
    let vm = this;
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=c339c6904bbd2182624e925c40f9ee8e&region=ID&page=1&release_date.gte=2018-11-8"
      )
      .then(function(result) {
        console.log(result.data);
        // vm.results = result.data;
        vm.movies = result.data.results;
        vm.movies = vm.movies.map(function(row, key) {
          row.slug = slug(row.title);
          if (row.vote_average < 3) row.price = 3500;
          else if (row.vote_average >= 3 && row.vote_average < 6)
            row.price = 8250;
          else if (row.vote_average >= 6 && row.vote_average < 8)
            row.price = 16350;
          else if (row.vote_average >= 8 && row.vote_average < 10)
            row.price = 21250;
          return row;
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-main {
  text-align: left;
  padding: 1rem;
}
.movie-wrapper {
  padding-bottom: 2rem;
  display: inline-block;
}
.movie-title {
  word-wrap: break-word;
  max-width: 150px;
}
</style>
