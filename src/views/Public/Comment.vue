<template>
  <div class="container">
    <chatlist class="textContent" :vkey="video"/>
    <textf class="tf" :vkey="video"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:false
    }
  },
  components: {
    'chatlist' : () => import('@/components/Public/Comment/mobileChatList'),
    'textf' : () => import('@/components/Public/Comment/mobileInput'),
  },
  methods:{
    load(){

    }
  },
  computed:{
    video(){
      var video = this.$route.params.id
      if(video)
        return video
      return 'common'
    }
  },
  mounted(){
    this.load()
  }
}
</script>

<style scoped>
.container{
  position: relative;
  padding: 0;
}
.textContent{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.tf{
  position: fixed;
  bottom:26px;
  background-color: black;
  left:0;
}
</style>
