<template lang="html">
  <div class="" v-if="uid">
    <MobilePicture v-if="isMobile"/>
    <Picture v-else/>
  </div>
  <div class="" v-else>
    Logged out. Redirecting...
  </div>
</template>

<script>
import MobilePicture from '@/components/User/Profile/MobilePicture'
import Picture from '@/components/User/Profile/Picture'
export default {
  components:{
    MobilePicture,
    Picture
  },
  computed:{
    uid(){
      return this.$store.state.session.uid
    },
    isMobile () {
      return this.$store.state.isMobile
    }
  },
  methods:{
    redirect(){
      if(!this.$cookies.isKey("uid")) {
        this.$router.push({name:'home'})
      }
    }
  },
  mounted(){
    setTimeout(function () {
      this.redirect()
    }, 1000)
  },
  watch:{
    uid(v,o){
      if(v==null){
        var self = this
        setTimeout(function () {
          self.$router.push({name:'home'})
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
</style>
