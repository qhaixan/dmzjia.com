<template lang="html">
<div class="" style="text-align:center;padding:20px;">
  <div class="" v-if="$store.state.session.uid">
    <h2>注销</h2>
    <h3>确定注销?</h3>
    <div class="">
      <v-btn color="info" @click="cancel">按错了</v-btn>
      <v-btn color="error" @click="confirmLogout">是的</v-btn>
    </div>
  </div>
  <div v-else class="bye">
    <img src="https://media1.tenor.com/images/43b26f57280c43f77e87a546bf6c6011/tenor.gif?itemid=5634610"/>
    <h3>再见~</h3>
  </div>
</div>
</template>

<script>
export default {
  methods:{
    confirmLogout(){
      this.$store.state.session.uid = null
      //this.fade()
    },
    cancel(){
      this.$store.commit('public_dialogPop',false)
    },
    fade(){
      var self = this
      setTimeout(function () {
        //self.$store.commit('public_dialogPop',false)
        //location.reload()
      }, 2000)
    }
  }
}
</script>

<style scoped>
.bye{
  text-align: center;
}
.bye img{
  width: 100%;
}
</style>
