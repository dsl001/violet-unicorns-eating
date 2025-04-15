<template>
  <!-- <HelloWithATwist /> -->
  <SimpleToDoList />
</template>

<script>
// import HelloWithATwist from "./components/HelloWithATwist.vue"
import SimpleToDoList from "./components/SimpleToDoList.vue"

export default {
  name: 'App',
  components: {
    // HelloWithATwist,
    SimpleToDoList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
