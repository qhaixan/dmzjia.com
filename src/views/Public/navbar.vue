<template lang="html">
  <div id="nav">
    <template v-if="isMobile">
      <mobileNav :routes="routes"/>
    </template>

    <template v-else>
      <router-link v-for="r in routes" :to="r.link" :key="r.link">{{r.text}} | </router-link>
      <template v-if="uid!=null">
        <span v-if="role>1"><router-link to="/controlpanel">Control Panel | </router-link></span>
        <span><router-link to="/user/profile">{{username}} | </router-link><a @click="logout">Logout</a></span>
      </template>
      <span v-else><a @click="login">Login</a></span>
    </template>
  </div>
</template>

<script>
import mobileNav from '@/components/Public/navbar/mobileNav'
import { mapState } from 'vuex';
export default {
  components:{
    mobileNav
  },
  data(){
    return {
      routes:[
        {
          text:'Home',
          icon:'home',
          route:'home',
          link:'/'
        },
        {
          text:'About',
          icon:'help',
          route:'about',
          link:'/about'
        },
        {
          text:'Test',
          icon:'create',
          route:'test',
          link:'/test'
        }
      ]
    }
  },
  methods: {
    login(){
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
    },
    logout(){
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
    },
    isMobile () {
      return this.$store.state.isMobile
    }
  },
  mounted() {

  },

}
</script>

<style scoped>
a{
  text-decoration: none !important;
}
</style>
