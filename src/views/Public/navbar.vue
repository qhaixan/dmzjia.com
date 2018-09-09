<template lang="html">
  <div id="nav">
    <router-link v-for="r in routes" :to="r.link">{{r.text}} | </router-link>
    <template v-if="uid!=null">
      <span v-if="role>1"><router-link to="/controlpanel">Control Panel | </router-link></span>
      <span><a>{{username}} | </a><a @click="logout">Logout</a></span>
    </template>
    <span v-else><a @click="login">Login</a></span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return {
      routes:[
        {
          text:'Home',
          link:'/'
        },
        {
          text:'About',
          link:'/about'
        },
        {
          text:'Test',
          link:'/test'
        }
      ]
    }
  },
  methods: {
    login(){
      this.$store.commit('public_dialogPop',true)
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
    },
    logout(){
      this.$store.commit('public_dialogPop',true)
      this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
    }
  },
  computed: {
    role () {
      return this.$store.state.session.role
    },
    username () {
      return this.$store.state.session.name
    },
    uid () {
      return this.$store.state.session.uid
    }
  },
}
</script>

<style scoped>
a{
  text-decoration: none!important;
}
</style>
