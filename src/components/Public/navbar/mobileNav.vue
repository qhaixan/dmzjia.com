<template lang="html">
  <div>
    <v-toolbar fixed color="black">
      <v-icon :color="$store.state.common.secondaryColor">live_tv</v-icon>
      <v-toolbar-title>{{$store.state.common.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs6 v-if="searchBar" style="">
        <v-text-field
          placeholder="搜索"
          solo
          single-line
          full-width
          :color="$store.state.common.secondaryColor"
          @blur="searchBar =! searchBar"
          autofocus
          append-outer-icon="clear"
          @keydown.native="keymonitor"
          v-model="query"
        >
        </v-text-field>
      </v-flex>
      <v-btn icon @click="searchBar =! searchBar" v-if="!searchBar">
        <v-icon :color="$store.state.common.secondaryColor">search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-bottom-nav style="background:black;"
    :active.sync="bottomNav"
    :value="true"
    fixed
    :color="bg"
    >
      <v-btn v-for="r in routes"
        dark
        ripple
        :key="r.link"
        :color="btnColor(r.route)"
        flat
        :value="r.route"
        :style="border(r.route)"
        @click="$router.push({name:r.route})"
      >
        <span>{{r.text}}</span>
        <v-icon>{{r.icon}}</v-icon>
      </v-btn>
      <v-btn v-if="uid==null"
        key="/login"
        :color="color"
        flat
        :value="curNavName"
        @click="login"
        :style="border('login')"
      >
        <span>登入</span>
        <v-icon>input</v-icon>
      </v-btn>
      <template v-else>
        <v-btn
          dark
          key="/collection"
          :color="btnColor('collection')"
          flat
          value="collection"
          :style="border('collection')"
          @click="$router.push({name:'collection'})"
        >
          <span>我的</span>
          <v-icon>subscriptions</v-icon>
        </v-btn>
        <v-btn
          dark
          key="/profile"
          :color="btnColor('profile')"
          flat
          value="profile"
          :style="border('profile')"
          @click="$router.push({name:'profile'})"
        >
          <span>账号</span>
          <v-icon>person</v-icon>
        </v-btn>
      </template>
    </v-bottom-nav>
  </div>
</template>

<script>
export default {
  data(){
    return {
      bottomNav:null,
      color:'white',
      bg:'black',
      searchBar: false,
      query:null
    }
  },
  props: {
    routes: Array
  },
  methods :{
    login(){
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
    },
    btnColor(r){
      if(r==this.bottomNav){
        return this.$store.state.common.secondaryColor
      }
      else {
        return this.color
      }
    },
    border(r){
      var color = null
      if(r==this.bottomNav){
        color = '#1c1c1c'
      }
      else {
        color = '#333333'
      }
      return 'border-top:solid;border-color:'+color+';border-width:thin;'
    },
    keymonitor: function(event) {
      if(event.key=="Enter"){
        if(this.query.length>0){
          this.$router.push({ name: 'list', query: { keyword: encodeURIComponent(this.query) }})
        }
        this.searchBar=false;
        //this.query = null
      }
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
    }
  },
  watch: {
    curNavName (v,o){
      this.searchBar = false
      this.bottomNav = this.curNavName
    }
  },
  mounted(){
    this.bottomNav = this.$route.name
  }
}
</script>

<style scoped>
</style>
