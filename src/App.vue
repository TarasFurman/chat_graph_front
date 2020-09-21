<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'App',
  components: {
    Home
  }
};
</script>

<style>
body {
  text-decoration: none;
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
</style>
