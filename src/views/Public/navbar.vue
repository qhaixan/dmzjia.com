<template lang="html">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/test">Test</router-link> |
    <router-link to="/controlpanel">Control Panel</router-link> |
    <button @click="reg">Register</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      register:true
    }
  },
  methods: {
    reg(){
      this.$store.commit('public_dialogPop')
      this.$store.commit('public_dialogContent',{content:'register',width:'350'})
    }
  }
}
</script>

<style lang="css">
</style>
