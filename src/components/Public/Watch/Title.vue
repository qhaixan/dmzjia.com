<template>
  <div class="title2">
    {{title}}
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      title:null
    }
  },
  methods:{
    getTitle(){
      var self = this
      animeRef.child(this.key).once("value", snap => {
        self.title = snap.val().title
      })
    }
  },
  mounted(){
    this.getTitle()
  },
  computed:{
    key(){
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.title2 {
  text-align: center;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
}
@media (min-width: 768px) {
  .title2{
    text-align: left;
  }
}
</style>
