<template lang="html">
<div class="" style="text-align:center;padding:20px;">
  <v-btn block color="#219100" @click="publish()" :disabled="invalid">发布</v-btn>
  <v-btn block color="#d18b00" @click="edit()">更改</v-btn>
</div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
import { hiddenAniRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      invalid:true
    }
  },
  computed:{
    action(){
      return this.$store.state.public.overlay.action
    }
  },
  mounted(){
    this.checkEpisode()
  },
  methods:{
    edit(){
      this.$store.state.action.key = this.action
      this.$router.push({name:'editAnime'})
      this.$store.commit('public_dialogPop',false)
    },
    checkEpisode(){
      var self = this
      hiddenAniRef.child(this.action).once('value',function(snap){
        if((Object.values(snap.val().episode).length > 0)&&snap.val().imgH.length>0){
          self.invalid = false
        }
      })
    },
    publish(){
      var self = this
      hiddenAniRef.child(this.action).once('value',function(snap){
        self.moveChild(snap.val())
      })
      this.$store.commit('public_dialogPop',false)
    },
    moveChild(child){
      animeRef.child(this.action).set(child)
      hiddenAniRef.child(this.action).remove()
    }
  }
}
</script>

<style scoped>
button{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
