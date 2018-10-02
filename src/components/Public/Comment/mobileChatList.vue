<template>
  <div class="">
    <div class="com" v-for="(c,key) in comments">
      {{c}}
    </div>
  </div>
</template>

<script>
import { commentsRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      comments:[]
    }
  },
  props:{
    vkey: String
  },
  mounted(){
    var self = this
    commentsRef.child(this.vkey).on('value',function(snapshot) {
      self.comments = []
      snapshot.forEach(function(childSnapshot) {
        self.comments.push(childSnapshot.val())
      })
    })
  }
}
</script>

<style scoped>
.com{
  border: solid;
}
</style>
