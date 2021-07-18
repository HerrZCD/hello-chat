<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view> 
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
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
  margin: 0;
  padding: 0;

}
body {
  /*  background-image: url("./assets/bg.jpeg"); */
  background-position: center center;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
}
html,body,#app{
width:100%;
height: 100%;
margin:0;
padding:0;
}
</style>
