<template lang="html">
<div class="" style="text-align:center;padding:20px;">
  <h2>添加动漫</h2>
  <br>
  <v-text-field
    label="动漫标题"
    v-model="title"
    solo
  ></v-text-field>
  <div style="text-align:right;">
    <v-btn :disabled="!valid" color="green" @click="submit">
      添加
    </v-btn>
  </div>
</div>
</template>

<script>
import { hiddenAniRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      title: ""
    }
  },
  methods:{
    submit(){
      var self = this
      hiddenAniRef.push({
        owner: this.uid,
        title: this.title
      })
      this.$store.commit('public_dialogPop',false)
    }
  },
  computed:{
    uid(){
      return this.$store.state.session.uid
    },
    valid(){
      if(this.title.length==0){
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
</style>
