<template>
  <div class="container" ref="cont">
    <CinematicPlayer class="content"/>
    <v-btn
      :color="$store.state.common.secondaryColor"
      id="full"
      @click="back"
      small
      dark
      fixed
      bottom
      right
      fab >
      <v-icon>clear</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  components: {
    'CinematicPlayer': () => import('@/components/Public/Watch/Player'),
  },
  methods:{
    back(){
      this.$router.push({ name: 'watch', params: { id: this.key, episode: this.episode }})
    }
  },
  mounted(){

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
.container{
  max-height: 100vh;
  max-width: 100vw;
  padding: 0;
}
.content{
  transform-origin: 0% 0%;/*x(>),y(v)*/
  height: 99vw!important;
  width: 99.8vh!important;
  /* -webkit-transform: rotate(90deg);
   -moz-transform: rotate(90deg);
   -ms-transform: rotate(90deg);
   -o-transform: rotate(90deg); */

    transform: rotate(90deg) translate(0%,-100%) scale(1);
}
</style>
