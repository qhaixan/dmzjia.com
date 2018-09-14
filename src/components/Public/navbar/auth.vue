<template lang="html">
  <circle-menu
      circle
      type="top"
      :number="b"
      mask=''
      animate
    >
    <div slot="item_btn" class="cover" style="background-color:grey;"><v-icon style="font-size:50px;">account_circle</v-icon></div>
    <template v-if="auth!=null">
      <div slot="item_3" class="cover" style="background-color:white;" @click="$router.push('/controlpanel')">CP</div>
      <div slot="item_1" class="cover" style="background-color:white;">{{name}}</div>
      <div slot="item_2" class="cover" style="background-color:white;" @click="logout">Logout</div>
    </template>
    <template v-else>
      <div slot="item_1" class="cover" style="background-color:white;" @click="toReg">Register</div>
      <div slot="item_2" class="cover" style="background-color:white;" @click="login">Login</div>
    </template>

  </circle-menu>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{
      b:2,
      auth:null
    }
  },
  mounted(){
    this.loadAuth()
  },
  methods:{
    loadAuth(){
      if(this.uid!=null){
        if(this.role>1){
          this.auth = 'admin'
          this.b = 3
        }else{
          this.auth = 'user'
        }
      }else{
        this.auth = null
        this.b = 2
      }
    },
    login(){
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
    },
    logout(){
      this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
    },
    toReg(){
      this.$store.commit('public_dialogContent',{content:'register',width:'350'})
    }
  },
  computed:{
    uid () {
      return this.$store.state.session.uid
    },
    role () {
      return this.$store.state.session.role
    },
    name() {
      return this.$store.state.session.name
    }
  },
  watch: {
    uid (v,o){
      this.loadAuth()
    }
  }
}
</script>

<style scoped>
.cover{
  border-radius:50%;
  height:50px;
  margin-left:-1px;
  margin-top:-1px;
}
</style>
