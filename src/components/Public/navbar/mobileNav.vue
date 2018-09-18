<template lang="html">
  <v-bottom-nav style="background:black;"
  :active.sync="bottomNav"
  :value="true"
  fixed
  :color="bg"
  >
    <v-btn v-for="r in routes"
      dark
      :key="r.link"
      :color="btnColor(r.route)"
      flat
      :value="r.route"
    >
      <span>{{r.text}}</span>
      <v-icon>{{r.icon}}</v-icon>
    </v-btn>
    <v-btn v-if="uid==null"
      key="/login"
      :color="color"
      flat
      value="login"
      @click="login"
    >
      <span>Login</span>
      <v-icon>input</v-icon>
    </v-btn>
    <v-btn v-else
      dark
      key="/profile"
      :color="btnColor('profile')"
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
      color:'white',
      selected:'#d10000',
      bg:'black'
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
    },
    btnColor(r){
      if(r==this.bottomNav){
        return this.selected
      }
      else {
        return this.color
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
