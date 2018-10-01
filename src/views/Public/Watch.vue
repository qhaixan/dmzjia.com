<template>
  <div class="wrapper watch">
    <Player class="playerz"/>
    <Title class="title"/>

    <Playlist class="playlist" v-if="!isMobile"/>
    <PlaylistMobile class="playlist" v-else/>
  </div>
</template>

<script>
import Player from '@/components/Public/Watch/Player'
import Title from '@/components/Public/Watch/Title'
export default {
  components: {
    Player,
    Title,
    'Playlist' : () => import('@/components/Public/Watch/Playlist'),
    'PlaylistMobile' : () => import('@/components/Public/Watch/PlaylistMobile'),
  },
  computed:{
    isMobile () {
      return this.$store.state.isMobile
    }
  }
}
</script>

<style scoped>
@import './../../static/styles/grid.css';
@import './../../static/styles/grid-watch.css';
</style>
