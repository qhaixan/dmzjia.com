<template lang="html">
<div class="" style="text-align:center;padding:20px;">
  <v-btn block color="#219100" @click="this.$store.commit('public_dialogPop',false);$router.push({name:'watch',params: { id: action }})">前往</v-btn>
  <v-btn block color="#9b0000" @click="hide()">取消发布</v-btn>
  <v-btn block color="#d18b00">更改</v-btn>
</div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
import { hiddenAniRef } from '@/firebaseConfig'
export default {
  computed:{
    action(){
      return this.$store.state.public.overlay.action
    }
  },
  methods:{
    hide(){
      var self = this
      animeRef.child(this.action).once('value',function(snap){
        self.moveChild(snap.val())
      })
      this.$store.commit('public_dialogPop',false)
    },
    moveChild(child){
      hiddenAniRef.child(this.action).set(child)
      animeRef.child(this.action).remove()
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
