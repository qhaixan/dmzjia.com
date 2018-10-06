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
      if(!this.$localStorage.get('RNnryrIfpw',null,String)){
        this.$store.state.session.uid = null
        this.$router.push({name:'home'})
      }
    }
  },
  mounted(){
    var self = this
    this.$nextTick(()=>{
      self.redirect()
    })
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
