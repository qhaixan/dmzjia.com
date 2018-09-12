<template lang="html">
  <div id="nav">
    <template v-if="isMobile">
      <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="white"
      >
        <v-btn v-for="r in routes"
          color="teal"
          flat
          :value="r.route"
        >
          <span>{{r.text}}</span>
          <v-icon>{{r.icon}}</v-icon>
        </v-btn>
      </v-bottom-nav>
    </template>

    <template v-else>
      <router-link v-for="r in routes" :to="r.link">{{r.text}} | </router-link>
      <template v-if="uid!=null">
        <span v-if="role>1"><router-link to="/controlpanel">Control Panel | </router-link></span>
        <span><a>{{username}} | </a><a @click="logout">Logout</a></span>
      </template>
      <span v-else><a @click="login">Login</a></span>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return {
      bottomNav:null,
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
    },
    isMobile () {
      return this.$store.state.isMobile
    },
    bottomNav() {
      return this.bottomNav
    },
    curNavName(){
      return this.$route.name
    }
  },
  mounted() {
    if(this.$route.path=='/'){
      this.bottomNav = this.$route.name
    }
  },
  watch: {
    bottomNav (v,o){
      this.$router.push({name: v})
    },
    curNavName (v,o){
      if(this.bottomNav==null)
        this.bottomNav = this.$route.name
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none !important;
}
</style>
