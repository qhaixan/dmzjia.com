<template>
  <div class="main">
    <div class="portrait">
      <v-icon id="icon">account_box</v-icon>
      <div class="username">{{username}}</div>
    </div>
    <div class="function">
      <!--v-btn @click="verify">verify</v-btn-->
      <v-btn v-if="role>1" @click="toCP">Control Panel</v-btn><br/>
      <v-btn @click="logout">Logout</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    role () {
      return this.$store.state.session.role
    },
    username () {
      return this.$store.state.session.name
    }
  },
  methods:{
    logout(){
      this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
    },
    toCP(){
      this.$router.push('/controlpanel')
    }
  }
}
</script>

<style scoped>
.portrait{
  text-align: center;
}
#icon{
  font-size: 40vw;
  margin-top: 10vw;
}
.username{
  font-size: 8vw;
}
.main{
  position: relative;
}
.function{
  width: 100vw;
  text-align: center;
  position: absolute;
  padding-bottom: 56px;
}
</style>
