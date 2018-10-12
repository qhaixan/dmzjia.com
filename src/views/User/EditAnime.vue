<template>
  <div class="">
    <h1 @click="chgTitle()">
      {{anime.title}}&nbsp;&nbsp;
      <v-icon style="font-size:60%;position:absolute;">edit</v-icon>
    </h1>
    <table>
      <tr>
        <td width="28.4%"><img v-if="anime.imgV" :src="anime.imgV"></td>
        <td width="71.6%"><img v-if="anime.imgH" :src="anime.imgH"></td>
      </tr>
      <tr style="text-align: center;">
        <td><v-btn :color="btnclr(anime.imgV)" @click="chgImg('imgV',anime.imgV)">{{btntxt(anime.imgV)}}直图</v-btn></td>
        <td><v-btn :color="btnclr(anime.imgH)" @click="chgImg('imgH',anime.imgH)">{{btntxt(anime.imgH)}}横图</v-btn></td>
      </tr>
    </table>
    <table>
      <tr>
        <td colspan="2"><h2>全集视频</h2></td>
      </tr>
      <tr v-for="e in episode">
        <td class="episodeindex">{{e.index}}</td><td><v-btn color="#d18b00" @click="edit(e)">更改</v-btn></td>
      </tr>
    </table>

    <v-btn
      color="#219100"
      id="add"
      dark
      fixed
      right
      fab
      @click="add">
      <v-icon>add</v-icon>
    </v-btn>

  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
import { hiddenAniRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      anime:{
        title:null,
        imgV:null,
        imgH:null
      },
      published:null,
      episode:[]
    }
  },
  mounted(){
    var self = this
    this.$nextTick(() => {

      if(!self.key){
        self.$router.push({name:'collection'})
      }else{
        animeRef.child(self.key).on('value',function(snap){
          self.published = true
          self.anime = snap.val()
          self.getEpisode(snap.val().episode)
        })
        if(!self.anime){
          hiddenAniRef.child(self.key).on('value',function(snap){
            self.published = false
            self.anime = snap.val()
            self.getEpisode(snap.val().episode)
          })
        }
      }
    });
  },
  methods:{
    getEpisode(ep){
      this.episode = []
      var keys = Object.keys(ep)
      var episode = Object.values(ep)

      for(var i=0;i<keys.length;i++){
        this.episode.push({
          key: keys[i],
          index:episode[i].index,
          source:episode[i].source,
          url:episode[i].url
        })
      }
      this.episode.sort(function(a, b){
          return ('' + a.index).localeCompare(('' + b.index), 'en', { numeric: true })
      })
    },
    chgTitle(){
      this.$store.commit('public_dialogAction',{  content:'edit_anime',
                                                  width:'350',
                                                  action:{
                                                    child:'title',
                                                    value:this.anime.title,
                                                    title:'更改标题',
                                                    placeholder:'输入新标题',
                                                    published:this.published
                                                  }
                                                })
    },
    chgImg(type,src){
      this.$store.commit('public_dialogAction',{  content:'edit_anime',
                                                  width:'350',
                                                  action:{
                                                    child:type,
                                                    value:src,
                                                    title:'更改图片',
                                                    placeholder:'输入图片连接',
                                                    published:this.published
                                                  }
                                                })
    },
    edit(episode){
      var self = this
      this.$store.commit('public_dialogAction',{content:'edit_episode',
                                                width:'350',
                                                action:{
                                                  anime: self.key,
                                                  episode: episode,
                                                  published:this.published
                                                }
                                              })
    },
    add(){
      var self = this
      this.$store.commit('public_dialogAction',{content:'edit_episode',
                                                width:'350',
                                                action:{
                                                  anime: self.key,
                                                  published:this.published
                                                }
                                              })
    },
    btnclr(s){
      if(s){
        return '#d18b00'
      }
      return '#219100'
    },
    btntxt(s){
      if(s){
        return '更改'
      }
      return '添加'
    }
  },
  computed:{
    key(){
      return this.$store.state.action.key
    }
  }
}
</script>

<style scoped>
img{
  max-width: 100%;
  max-height: 100%;
}
td{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.episodeindex{
  font-size: 5vw;
  text-align: right;
  padding-right: 5px;
  color:cyan;
}
#add{
  bottom: 70px;
}
</style>
