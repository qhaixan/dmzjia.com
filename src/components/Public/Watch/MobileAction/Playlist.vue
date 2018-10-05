<template>
  <div class="playlist">
    <v-btn
      :disabled="episode==null"
      :color="$store.state.common.secondaryColor"
      @click="fullscreen"
      block
       >
      <v-icon>fullscreen</v-icon> 打横观看
    </v-btn>
    <v-layout row wrap>
      <div v-for="e in episodes">
        <router-link :to="{ name: 'watch', params: {id:key,episode:e.id} }">
          <v-btn :color="select(e.id)" @click="alert(e.id)">
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
    fullscreen(){
      this.$router.push({ name: 'cinematic', params: { id: this.key, episode: this.episode }})
    },
    loadList(){
      var self = this
      this.episodes = []
      animeRef.child(this.key).child('episode').once("value", snap => {
        snap.forEach(function(episode) {
          self.episodes.push({
            index:episode.val().index,
            source:episode.val().source,
            url:episode.val().url,
            id:episode.key
          })
        })

      })
    },
    select(id){
      if(id==this.episode){
        return 'black'
      }
      return this.$store.state.common.secondaryColor
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
