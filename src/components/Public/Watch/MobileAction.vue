<template>
  <div class="bottomPart">
    <v-btn @click="next">next tab</v-btn>
    <v-tabs
      grow
      color="black"
      dark
      slider-color="#d10000"
      v-touch="{
        left: () => assignSwipeValue('Left'),
        right: () => assignSwipeValue('Right')
        }"
      v-model="active"
    >
      <v-tab>列表</v-tab>
      <v-tab-item class="window">
        <Playlist/>
      </v-tab-item>

      <v-tab>留言</v-tab>
      <v-tab-item class="window">
      </v-tab-item>
    </v-tabs>
    <v-btn
      v-if="episode"
      color="#d10000"
      id="full"
      @click="fullscreen"
      small
      dark
      fixed
      right
      bottom
      fab >
      <v-icon>fullscreen</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active: null,
      max:1
    }
  },
  components: {
    'Playlist' : () => import('@/components/Public/Watch/MobileAction/Playlist'),
  },
  methods:{
    fullscreen(){
      this.$router.push({ name: 'cinematic', params: { id: this.key, episode: this.episode }})
    },
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
  }
}
</script>

<style scoped>
.bottomPart{
  overflow-y: scroll;
  max-height: calc( 100vh - ( 100vw * 0.56 ) - 142px );
}
.window{
  height: calc( 100vh - ( 100vw * 0.56 ) - 239px );
}
#full{
  bottom: 70px;
}
</style>
