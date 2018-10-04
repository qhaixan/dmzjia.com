<template>
  <div class="container" ref="cont">
    <chatlist class="textContent" :vkey="video" :style="{height: innerheight}"/>
    <textf class="tf" :vkey="video"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:false,
      windowHeight:null,
      innerheight:"100px",
    }
  },
  watch: {
    windowHeight(v, o) {

      /*
      var gap = v-o
      this.innerHeight = v - 300//102
      if(gap<60){
        this.innerHeight += gap
      }*/
      alert(this.innerHeight)
    }
  },
  components: {
    'chatlist' : () => import('@/components/Public/Comment/mobileChatList'),
    'textf' : () => import('@/components/Public/Comment/mobileInput'),
  },
  methods:{

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
    this.innerheight="300px"
    if(this.$route.name == 'comment'){
      this.$nextTick(() => {
        this.windowHeight = window.innerHeight
        window.addEventListener('resize', () => {
          this.windowHeight = window.innerHeight
        });
      })
    }else{

    }

  }
}
</script>

<style scoped>
.container{
  position: relative;
  padding: 0;
  border: solid;
}
.textContent{
  position: absolute;
  top:0;
  width: 100%;
  overflow-y: scroll;
}
.tf{
  position: fixed;
  bottom:26px;
  background-color: black;
  left:0;
}
</style>
