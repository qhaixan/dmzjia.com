<template lang="html">
<div class="" style="text-align:center;padding:20px;">
  <div class="" v-if="$store.state.session.uid">
    <h2>Log out</h2>
    <h3>Are you sure?</h3>
    <div class="">
      <v-btn color="info" @click="cancel">No</v-btn>
      <v-btn color="error" @click="confirmLogout">Yes</v-btn>
    </div>
  </div>
  <h3 v-else>Logged out</h3>
</div>
</template>

<script>
export default {
  methods:{
    confirmLogout(){
      this.$store.state.session.uid = null
      this.fade()
    },
    cancel(){
      this.$store.commit('public_dialogPop',false)
    },
    fade(){
      var self = this
      setTimeout(function () {
        //self.$store.commit('public_dialogPop',false)
        location.reload()
      }, 2000)
    }
  }
}
</script>

<style scoped>
</style>
