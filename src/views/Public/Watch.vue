<template>
  <div class="wrapper">
    <template>
      <Player class="player"/>title here
      <Playlist class="playlist"/>
    </template>
  </div>
</template>

<script>
import Player from '@/components/Public/Watch/Player'
import Playlist from '@/components/Public/Watch/Playlist'
export default {
  components: {
    Player,
    Playlist,
  }
}
</script>

<style scoped>
@import './../../static/styles/grid.css';
@import './../../static/styles/grid-watch.css';
</style>
