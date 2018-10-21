<template>
  <div class="">
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      dark
      @mouseleave.native="closeDrawer"
    >
      <v-list dense>
        <v-list-tile v-for="r in routes" @click="goRoute(r.route)">
          <v-list-tile-action>
            <v-icon color="#d10000">{{r.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{r.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <hr style="border-color:grey;background-color:grey;color:grey;">

      <v-list dense v-if="uid">
        <v-list-tile @click="profile">
          <v-list-tile-action>
            <v-icon color="#d10000">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>我的账号</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push({name:'collection'})">
          <v-list-tile-action>
            <v-icon color="#d10000">subscriptions</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>我的动漫</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="toCP" v-if="role>1">
          <v-list-tile-action>
            <v-icon color="#d10000">style</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>管理员页面</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon color="#d10000">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>注销</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense v-else>
        <v-list-tile @click="login">
          <v-list-tile-action>
            <v-icon color="#d10000">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>登入</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="register">
          <v-list-tile-action>
            <v-icon color="#d10000">person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>注册</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="ml-0 pl-3" style="width: 300px">
        <router-link id="title" :to="{ name: 'home', params: {} }">
          <v-icon style="font-size:140%;" :color="$store.state.common.secondaryColor">live_tv</v-icon> {{$store.state.common.title}}
        </router-link>
      </v-toolbar-title>
      <v-text-field
        flat
        dark
        solo
        label="Search"
        class="hidden-sm-and-down"
        v-model="query"
        @keydown.native="keymonitor"
      ></v-text-field>
      <v-spacer></v-spacer>
      <img :src="avatar" class="avatarIcon" @click="profile">

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
import { usersRef } from '@/firebaseConfig'
export default {
  data(){
    return {
      drawer: false,
      query:null,
      // avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxC8tK9WH3CbaNFjiCcOkdiJlCyTL9IObOMJN63ECX_R-DmN8Jhw'
    }
  },
  props: {
    routes: Array
  },
  methods: {
    closeDrawer(){
      this.drawer = false
    },
    goRoute(r){
      this.drawer = false
      this.$router.push({name:r})
    },
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
      if(this.uid){
        this.$router.push({name: 'profile'})
      }else{
        this.login()
      }
    },
    keymonitor: function(event) {
      if(event.key=="Enter"){
        if(this.query.length>0){
          var letters = /^[0-9a-zA-Z]+$/;
          if (letters.test(this.query)) {
            this.$router.push({ name: 'list', query: { keyword: this.query }})
          }else{
            this.$router.push({ name: 'list', query: { keyword: encodeURIComponent(this.query) }})
          }

        }
        //this.query = null
      }
    }
  },
  mounted(){

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
    avatar () {
      if(this.$store.state.session.avatar){
        return this.$store.state.session.avatar
      }
      return this.$store.state.common.avatar
    }
  }
}
</script>

<style scoped>
#title{
  text-decoration: none;
  color: white;
}
.avatarIcon{
  max-height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.avatarIcon:hover{
  cursor: pointer;
  box-shadow: 1px 1px 30px red;
}
</style>
