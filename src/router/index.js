import Vue from "vue";
import Router from "vue-router";
import Movie from "@/components/Movie";
import MovieDetail from "@/components/MovieDetail";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "Movie",
      component: Movie
    },
    {
      path: "/:movie_id-:slug",
      name: "MovieDetail",
      component: MovieDetail
    }
  ]
});
