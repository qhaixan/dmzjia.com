<template>
  <div ref="playlist" class="playlist">
    <table v-if="episodes.length > 0 && false">
      <tbody v-bind:style="{ 'height': height }">
        <template v-for="(e,i) in sortedEpisodes">
          <tr class="selectable list">
            <!--<td class="index" @click="select(e.key)">-->
            <td class="index">
              <router-link  :class="highlightIndex(e.key)"
                            :to="{ name: 'watch', params: { id:$route.params.id, episode:e.key } }">
                            第 {{e.index}} 集 [{{e.channel}}]
              </router-link>
              <!--<span v-bind:class="highlightIndex(e.key)">第 {{e.index}} 集 [{{e.channel}}]</span>-->
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <table v-if="episodes.length > 0">
      <tbody>
        <template v-for="(e,i) in sortedEpisodes">
          <tr class="selectable list">
            <!--<td class="index" @click="select(e.key)">-->
            <td class="index">
              <router-link  :class="highlightIndex(e.key)"
                            :to="{ name: 'watch', params: { id:$route.params.id, episode:e.key } }">
                            第 {{e.index}} 集 [{{e.channel}}]
              </router-link>
              <!--<span v-bind:class="highlightIndex(e.key)">第 {{e.index}} 集 [{{e.channel}}]</span>-->
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="fullw" v-else>
      对不起，找不到视频~<br/>
    </div>
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data(){
    return {
      episodes:[],
      selectedVideo:null,
      height:'0px'
    }
  },
  methods: {
    getList() {
      var id = this.$route.params.id
      var self = this

      const episodeRef = animeRef.child(id).child('episode')

      episodeRef.on("value", snap => {
        self.episodes=[]
        snap.forEach(function(episode) {
          self.episodes.push({
            index:episode.val().index,
            channel:episode.val().channel,
            videoID:episode.val().id,
            key:episode.key
          })
        })

      })
    },
    select(key){
      if(key!=this.$route.params.episode)
      {
        var id = this.$route.params.id
        this.$router.push({ name: 'Watch', params: { id:id, episode:key }})
      }
    },
    onResize(event) {
      this.setSize()
    },
    setSize(){
      this.height = this.$refs.playlist.clientHeight+'px'
    }
  },
  computed: {
    sortedEpisodes: function() {
      function compare(a, b) {
        if (parseInt(a.index) < parseInt(b.index))
          return -1;
        if (parseInt(a.index) > parseInt(b.index))
          return 1;
        return 0;
      }
      return this.episodes.sort(compare);
    },
    highlightIndex: function() {
      return function(key){
        if(this.$route.params.episode===key){
          return 'highlight'
        }else{
          return 'ignore'
        }
      }
    },
  },
  mounted(){
    this.getList()
    window.addEventListener('resize', this.onResize)
    this.setSize()
  },
  watch: {
    '$route' (to, from) {
      if(to){
        this.getList()
      }
      else {
        this.getList()
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import './../../../static/styles/list.css';
.index {
  width:400px!important;
  max-width:400px!important;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.ignore {
  text-decoration: none;
  color: black;
}
.ignore:hover {
  color: blue;
}
.highlight {
  color: #e00000;
  text-decoration: none;
  font-weight: 500;
}
.highlight:hover {
  cursor: default;
}
.playlist{
  height: 100px !important;
}
table {
  margin-top: 0px;
  width:100%;
}
tbody {
  height: calc( 100vw );
  overflow-y: auto;
}
@media (min-width: 500px) {
  table{
    margin-left: -10px;
    width:190px;
  }
}
</style>
