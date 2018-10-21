<template>
<div class="playlist">
  <h3 style="text-decoration:underline;">所有视频({{episodes.length}}集)</h3>
  <router-link v-for="e in episodes" :to="{ name: 'watch', params: {id:key,episode:e.id} }">
    <div class="label" :style="select(e.id)">
      <span>{{e.index}}</span>
    </div>
  </router-link>
</div>
</template>

<script>
import {
  animeRef
} from '@/firebaseConfig'
export default {
  data() {
    return {
      episodes: []
    }
  },
  methods: {
    fullscreen() {
      this.$router.push({
        name: 'cinematic',
        params: {
          id: this.key,
          episode: this.episode
        }
      })
    },
    loadList() {
      var self = this
      this.episodes = []
      animeRef.child(this.key).child('episode').once("value", snap => {
        snap.forEach(function(episode) {
          self.episodes.push({
            index: episode.val().index,
            source: episode.val().source,
            url: episode.val().url,
            id: episode.key
          })
        })

      })
    },
    select(id) {
      if (id == this.episode) {
        return 'background:rgba(89, 89, 89,0.4);color:#00ce33;font-weight:700;'
      }
      return ''
    }
  },
  computed: {
    key() {
      return this.$route.params.id
    },
    episode() {
      return this.$route.params.episode
    }
  },
  mounted() {
    this.loadList()
  }
}
</script>

<style scoped>
.playlist .label {
  border-bottom: solid;
  border-color: #3d3d3d;
  border-width: thin;
  padding: 5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
a {
  text-decoration: none;
  color: white;
}
</style>
