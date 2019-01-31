<template lang='pug'>
.movie-main
  .load-previous
      router-link(:to="{path:'/', query:{page:parseInt(current_page)-1}}", v-if='current_page>1').load-more-button muat lebih banyak
  .glide.ph2
    .glide__track(data-glide-el='track')
      ul.glide__slides
        li.glide__slide(v-for="(m,k) in movies_highlight", :key="k")
          div(:style="{'width' : '100%', height:'60vh', 'background-size':'cover', 'background-position':'center top', 'background-image' : 'url(https://image.tmdb.org/t/p/original'+m.poster_path+')'}").br2
          div.movie-desc
            .movie-title {{ m.title }}
    .glide__bullets(data-glide-el='controls[nav]')
      button.glide__bullet(data-glide-dir='=0')
      button.glide__bullet(data-glide-dir='=1')
      button.glide__bullet(data-glide-dir='=2')
      button.glide__bullet(data-glide-dir='=3')
      button.glide__bullet(data-glide-dir='=4')



  .movie-grid
    div.movie-wrapper(v-for="(m,k) in movies", :key="k").relative
      router-link(:to="{name : 'MovieDetail', params : {movie_id : m.id, slug:m.slug}}")
        img(:src="'https://image.tmdb.org/t/p/w200' + m.poster_path")
      .movie-title
        router-link(:to="{name : 'MovieDetail', params : {movie_id : m.id, slug:m.slug}}")
          b {{ m.title }}
      div Rating : {{ m.vote_average ? m.vote_average : "-" }}
      div Harga : {{ m.price | getCurrencyFormat}}
      label(v-if='$store.getters.getOwnedMovieStatus(m.id)').label-owned Sudah dimiliki
  .load-more
      router-link(:to="{path:'/', query:{page:parseInt(current_page)+1}}", v-if='current_page!=total_pages').load-more-button muat lebih banyak
</template>

<script>
import axios from "axios";
import slug from "slug";
import _ from "lodash";
import moment from "moment";
import Glide from "@glidejs/glide";

export default {
  props: ["page"],
  filters: {
    getCurrencyFormat(value) {
      return new Intl.NumberFormat("id", {
        style: "currency",
        currency: "IDR"
      }).format(value);
    }
  },
  data() {
    return {
      movies: [],
      movies_highlight: [],
      current_page: 1,
      total_pages: 0,
      results: null
    };
  },

  watch: {
    $route(to, from) {
      this.loadMoviesByPage(to.query.page, to.query.page - from.query.page);
    }
  },
  mounted() {
    if (this.page) this.current_page = this.page;
    this.loadMoviesByPage(this.current_page);
  },
  methods: {
    loadMoviesByPage(page, state = 1) {
      let vm = this;
      this.current_page = page;
      let date = moment(new Date())
        .subtract(3, "month")
        .format("YYYY-MM-DD");

      let movies_url =
        "https://api.themoviedb.org/3/movie/now_playing?api_key=c339c6904bbd2182624e925c40f9ee8e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&region=ID&release_date.gte=" +
        date +
        "&page=" +
        this.current_page;

      axios.get(movies_url).then(function(result) {
        vm.total_pages = result.data.total_pages;

        if (state != -1) {
          vm.movies = vm.movies.concat(result.data.results);
        } else {
          vm.movies = result.data.results.concat(vm.movies);
        }

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
        vm.movies_highlight = _.take(vm.movies, 5);
        setTimeout(function() {
          new Glide(".glide").mount();
        }, 300);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.movie-grid {
  text-align: left;
  padding: 1rem;
  display: grid;
  grid-template-columns: auto auto;
  @media (min-width: 400) {
    grid-template-columns: auto auto;
  }
  @media (min-width: 700px) {
    grid-template-columns: auto auto auto auto;
  }
  @media (min-width: 1200px) {
    grid-template-columns: auto auto auto auto auto;
  }
}
.movie-wrapper {
  padding-bottom: 2rem;
  display: inline-block;
  .movie-title {
    word-wrap: break-word;
    max-width: 150px;
  }
  img {
    min-height: 290px;
  }
  label.label-owned {
    background-color: orange;
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: white;
    padding: 0.3rem;
    border-radius: 3px;
  }
}

.glide {
  .movie-desc {
    position: absolute;
    bottom: 1rem;
    padding-left: 1rem;
    padding-bottom: 2rem;
    text-align: left;
    color: white;
    .movie-title {
      font-size: 2.5rem;
      padding: 0 0.3rem;
      background-color: transparentize($color: #000000, $amount: 0.3);
    }
  }
}

.load-more-button {
  border: 1px solid black;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
}
</style>
