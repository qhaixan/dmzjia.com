<template>
  <div class="playlist">
    <v-layout row wrap>
      <div v-for="e in episodes">
        <router-link :to="{ name: 'watch', params: {id:key,episode:e.id} }">
          <v-btn :color="select(e.id)">
            {{e.index}}
          </v-btn>
        </router-link>
      </div>
    </v-layout>
    <v-btn
      v-if="episode"
      color="#d10000"
      id="full"
      @click="fullscreen"
      small
      dark
      fixed
      right
      fab >
      <v-icon>fullscreen</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data(){
    return {
      episodes:[]
    }
  },
  methods:{
    loadList(){
      var self = this
      this.episodes = []
      animeRef.child(this.key).child('episode').once("value", snap => {
        snap.forEach(function(episode) {
          self.episodes.push({
            index:episode.val().index,
            channel:episode.val().channel,
            videoID:episode.val().id,
            id:episode.key
          })
        })

      })
    },
    select(id){
      if(id==this.episode){
        return 'black'
      }
      return '#d10000'
    },
    fullscreen(){
      this.$router.push({ name: 'cinematic', params: { id: this.key, episode: this.episode }})
    }
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
    this.loadList()
  }
}
</script>

<style scoped>
.playlist{
  overflow-y: scroll;
  max-height: calc( 100vh - ( 100vw * 0.56 ) - 142px );
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 10px;
  align-items: stretch;
}
#full{
  bottom: 70px;
}
a{
  text-decoration: none;
}
</style>
