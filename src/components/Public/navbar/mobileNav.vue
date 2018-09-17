<template lang="html">
  <v-bottom-nav
  :active.sync="bottomNav"
  :value="true"
  fixed
  color="white"
  >
    <v-btn v-for="r in routes"
      :key="r.link"
      color="teal"
      flat
      :value="r.route"
    >
      <span>{{r.text}}</span>
      <v-icon>{{r.icon}}</v-icon>
    </v-btn>
    <v-btn v-if="uid==null"
      key="/login"
      color="teal"
      flat
      value="login"
      @click="login"
    >
      <span>Login</span>
      <v-icon>input</v-icon>
    </v-btn>
    <v-btn v-else
      key="/profile"
      color="teal"
      flat
      value="profile"
    >
      <span>Profile</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data(){
    return {
      bottomNav:null,
    }
  },
  props: {
    routes: Array
  },
  mounted(){
    if(this.curNavName=='home'){//other route will auto trigger
      this.bottomNav = this.$route.name
    }
  },
  methods :{
    login(){
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
    }
  },
  computed:{
    curNavName(){
      return this.$route.name
    },
    uid () {
      return this.$store.state.session.uid
    },
    username () {
      return this.$store.state.session.name
    },
  },
  watch: {
    bottomNav (v,o){
      if(v!='login'){
        this.$router.push({name: v})
      }else{
        this.bottomNav = o
      }
    },
    curNavName (v,o){
      this.bottomNav = this.$route.name
    }
  }
}
</script>

<style scoped>
</style>
