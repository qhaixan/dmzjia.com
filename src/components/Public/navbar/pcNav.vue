<template>
  <div class="">
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="r in routes" @click="$router.push({name:r.route});">
          <v-list-tile-action>
            <v-icon>{{r.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{r.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="ml-0 pl-3" style="width: 300px"><router-link id="title" :to="{ name: 'home', params: {} }"><v-icon>live_tv</v-icon> {{$store.state.common.title}}</router-link></v-toolbar-title>
      <v-text-field
        flat
        dark
        solo
        disabled
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>


      <v-menu bottom offset-y>
        <v-btn icon slot="activator">
          <v-icon>person</v-icon>
        </v-btn>
        <v-list v-if="uid">
          <v-list-tile @click="profile">
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="toCP" v-if="role>1">
            <v-list-tile-title>Manage</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list v-else>
          <v-list-tile @click="login">
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="register">
            <v-list-tile-title>Register</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>
    <router-link v-for="r in routes" :to="r.link" :key="r.link">{{r.text}} | </router-link>
    <template v-if="uid!=null">
      <span v-if="role>1"><router-link to="/controlpanel">Control Panel | </router-link></span>
      <span><router-link to="/user/profile">{{username}} | </router-link><a @click="logout">Logout</a></span>
    </template>
    <span v-else><a @click="login">Login</a></span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      drawer: false
    }
  },
  props: {
    routes: Array
  },
  methods: {
    login(){
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
    },
    register(){
      this.$store.commit('public_dialogContent',{content:'register',width:'350'})
    },
    logout(){
      this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
    },
    toCP(){
      this.$router.push('/controlpanel')
    },
    profile(){
      this.$router.push({name: 'profile'})
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
  }
}
</script>

<style scoped>
#title{
  text-decoration: none;
  color: white;
}
</style>
