<template>
  <div class="wrapper">
    <template>
      <Player class="player"/>
      <Title class="title"/>

      <Playlist class="playlist" v-if="!isMobile"/>
      <PlaylistMobile class="playlist" v-else/>
    </template>
  </div>
</template>

<script>
import Player from '@/components/Public/Watch/Player'
import Title from '@/components/Public/Watch/Title'
import Playlist from '@/components/Public/Watch/Playlist'
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
