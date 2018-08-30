<template lang="html">
<div class="" style="text-align:center;padding:20px;">
  <h3>Logging out...</h3>
</div>
</template>

<script>
export default {
  mounted(){
    var self = this
    this.$store.state.session.uid = null
    setTimeout(function () {
      self.$store.commit('public_dialogPop')
    }, 2000)
  }
}
</script>

<style lang="css">
</style>
