<template lang="html">
  <div class="" v-if="uid">
    <h1>My profile</h1>
    {{uid}}
    <br>
    <v-btn @click="toCP">ControlPanel</v-btn>
    <br>
    <v-btn @click="logout">Logout</v-btn>
  </div>
  <div class="" v-else>
    You are not logged in. Redirecting...
  </div>
</template>

<script>
export default {
  computed:{
    uid(){
      return this.$store.state.session.uid
    },
    role () {
      return this.$store.state.session.role
    }
  },
  methods:{
    logout(){
      this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
    },
    toCP(){
      this.$router.push('/controlpanel')
    },
    redirect(){
      if(!this.$cookies.isKey("uid")) {
        this.$router.push({name:'home'})
      }
    }
  },
  mounted(){
    setTimeout(function () {
      this.redirect()
    }, 1000)
  },
  watch:{
    uid(v,o){
      if(v==null){
        var self = this
        setTimeout(function () {
          self.$router.push({name:'home'})
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
</style>
