<template>
  <div id="app">
    <!--div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">{{hello}}</router-link>
    </div-->
    <router-view/>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        hello:'ddd'
      }
    },
    methods: {

    },
    created(){
      /*
      if(!this.$cookies.isKey("user_session")) {
        var A = Math.floor(Math.random() * 100);
        this.$cookies.set("user_session",A)
      }*/
    }
  }
</script>
<style>

</style>
