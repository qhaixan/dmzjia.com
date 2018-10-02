<template>
  <div class="">
    {{username}}
    <br>
    <v-btn @click="toCP" v-if="role>1">ControlPanel</v-btn>
    <br>
    <v-btn @click="logout">Logout</v-btn>
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
</style>
