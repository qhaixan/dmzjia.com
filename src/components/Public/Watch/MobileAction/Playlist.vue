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
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 10px;
  align-items: stretch;
}
a{
  text-decoration: none;
}
</style>
