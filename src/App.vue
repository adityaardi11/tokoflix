<template lang='pug'>
#app
  header.z-1
    router-link(:to='{path : "/"}').logo-wrapper.relative.z-1
      img.logo(:src='require("./assets/logo_dark.png")')
      span.text-logo TokoFlix
    span.flex-auto
    span {{ $store.getters.getCashDisplay }}
    div.movies-owned-wrapper
      button(@click='display_dropdown_movies_owned = !display_dropdown_movies_owned' :class="display_dropdown_movies_owned ? 'open' : ''").movies-owned-button {{ $store.getters.getMoviesOwnedCount }} film dimiliki
      div(v-if='display_dropdown_movies_owned').movies-owned
        div(v-for='m in $store.getters.getMoviesOwned')
          div {{ m.title }}
          img(:src='"https://image.tmdb.org/t/p/w500"+m.poster_path')
  main
    router-view
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      display_dropdown_movies_owned: false
    };
  }
};
</script>

<style lang='scss'>
body {
  margin: 0;
}

#app {
  font-family: "Google Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.swal2-container {
  font-family: "Google Sans", Helvetica, Arial, sans-serif;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 4rem;
  padding: 0 16px 0 24px;
  background-color: #4fa149;
  color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  .logo-wrapper {
    display: flex;
    align-items: center;
    text-decoration: none;

    img.logo {
      height: 2.3rem;
    }
    span {
      display: block;
      padding-left: 0.3rem;
      font-size: 1.63rem;
      color: white;
      font-weight: bold;
    }
  }

  span {
    display: block;
    box-sizing: border-box;
  }
  .movies-owned-wrapper {
    position: relative;

    .movies-owned-button {
      background: transparent;
      border: 1px solid white;
      border-radius: 3px;
      font-size: 0.8rem;
      padding: 0.5rem 0.7rem;
      color: white;
      display: block;
      cursor: pointer;
      margin-left: 1rem;
      &.open {
        background: black;
      }
    }
    .movies-owned {
      display: block;
      position: absolute;
      right: 0rem;
      top: 2.3rem;
      background-color: #63b85d;
      color: white;
      border-radius: 3px;
      color: black;
      padding: 1rem;
      width: 16rem;
      max-height: 28rem;
      overflow-y: scroll;
    }
  }
}
</style>
