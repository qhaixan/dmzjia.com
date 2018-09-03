<template lang="html">
<div class="" style="text-align:center;padding:20px;">
  <div class="" v-if="!confirm">
    <h2>Log out</h2>
    <h3>Are you sure?</h3>
    <div class="">
      <v-btn color="info" @click="cancel">No</v-btn>
      <v-btn color="error" @click="confirmLogout">Yes</v-btn>
    </div>
  </div>
  <h3 v-else>Logging out...</h3>
</div>
</template>

<script>
export default {
  data(){
    return{
      confirm:false
    }
  },
  methods:{
    confirmLogout(){
      this.confirm = true

      var self = this
      this.$store.state.session.uid = null
      this.$store.state.session.name = null
      this.$store.state.session.role = 0
      setTimeout(function () {
        self.$store.commit('public_dialogPop',false)
      }, 2000)
    },
    cancel(){
      this.$store.commit('public_dialogPop',false)
    }
  }
}
</script>

<style lang="css">
</style>
