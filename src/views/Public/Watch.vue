<template>
  <div class="wrapper watch">
    <template v-if="!isMobile">
      <Player class="playerz"/>
      <Playlist class="playlist"/>
    </template>
    <Title v-if="!isMobile" class="title"/>
    <template v-else>
      <Player class="playerz"/>
      <Title class="title"/>
      <MobileAction class="playlist"/>
    </template>
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
    'MobileAction' : () => import('@/components/Public/Watch/MobileAction'),
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
