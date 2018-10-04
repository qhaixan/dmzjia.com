<template>
  <div class="bottomPart">
    <v-tabs
      grow
      color="black"
      dark
      :slider-color="$store.state.common.secondaryColor"
      v-touch="{
        left: () => assignSwipeValue('Left'),
        right: () => assignSwipeValue('Right')
        }"
      v-model="active"
    >
      <v-tab>列表</v-tab>
      <v-tab-item class="window" :style="{height: tabHeight+'px'}">
        <Playlist/>
      </v-tab-item>

      <v-tab>留言</v-tab>
      <v-tab-item class="window" :style="{height: tabHeight+'px'}">
        <Comments class="comment"/>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script>
export default {
  data(){
    return{
      active: null,
      max:1,
      windowHeight: 0,
      tabHeight:null
    }
  },
  components: {
    'Playlist' : () => import('@/components/Public/Watch/MobileAction/Playlist'),
    'Comments' : () => import('@/views/Public/Comment'),
  },
  methods:{
    assignSwipeValue(direction) {
      if(direction=='Left'){//+1
        this.next(1)
      }else if(direction=='Right'){
        this.next(-1)
      }
    },
    next (v) {
      if((v<0 && this.active>0)||(v>0 && this.active<this.max)){
        this.active+=v
      }
    },
  },
  computed:{
    key(){
      return this.$route.params.id
    },
    episode(){
      return this.$route.params.episode
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.windowHeight = window.innerHeight
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight
      });
    })
  },
  watch: {
    windowHeight(v, o) {
      if(v>o&&o>0){
        var gap = v-o
      }else{

      }
      var gap = v-o
      this.tabHeight = v-(window.innerWidth * 0.56)-208
    }
  },
}
</script>

<style scoped>
.bottomPart{
  height: calc( 100vh - ( 100vw * 0.56 ) - 142px );
}
.window{
  overflow-y: scroll;
  /* height: calc( 100vh - ( 100vw * 0.56 ) - 239px ); */
}
.comment{
  /* height: calc( 100vh - ( 100vw * 0.56 ) - 239px ); */
}

</style>
