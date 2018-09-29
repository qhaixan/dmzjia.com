<template>
  <div class="player">
    <div v-if="video.id==''" class="banner" :style="{ 'background-image': 'url(' + banner + ')' }"></div>
    <template v-else>
      <template v-if="video.channel=='Openload'" class="Openload">
        <!--<a target="_blank" :href="'https://openload.co/f/'+videoURL"><button style="padding:5px;">下载>></button></a>-->
        <iframe height="100%" width="100%" :src="'https://openload.co/embed/'+video.id" allowfullscreen="allowfullscreen"></iframe>
      </template>
      <template v-else class="other">
        <!--<iframe v-if="source.host=='dailyMotion'" height="100%" width="100%" :src="'//www.dailymotion.com/embed/video/'+source.url" allowfullscreen="allowfullscreen"></iframe>-->
        <iframe v-if="video.channel=='GoogleDrive'" :src="'https://drive.google.com/file/d/'+video.id+'/preview'" allowfullscreen="allowfullscreen"></iframe>
        ​<iframe v-if="video.channel=='YouTube'" :src="'https://www.youtube.com/embed/'+video.id" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="margin-top:-24px;"></iframe>
        <iframe v-if="video.channel=='Youku'" :src="'https://player.youku.com/embed/'+video.id+'==?autoplay=true'" frameborder=0 allowfullscreen="allowfullscreen" style="margin-top:-24px;"></iframe>
        <!--
        <video v-if="video.channel=='other'" height="100%" width="100%" controls>
    			<source :src="videoURL" type="video/mp4">
    			你使用的浏览器不支持此播放器。(jwplayer)
    		</video>-->

        <iframe scrolling="no" style="overflow:hidden;" v-else height="100%" width="100%" :src="video.id" allowfullscreen="allowfullscreen"></iframe>
      </template>
    </template>
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      video:{
        channel:'',
        id:''
      },
      banner:''
    }
  },
  methods: {
    getParams(){
      this.getVideo(
        this.$route.params.id,
        this.$route.params.episode)
    },
    getVideo(anime,video){
      var self = this
      this.video.channel = ''
      this.video.id = ''
      const bannerRef = animeRef.child(anime).child('imgH')
      bannerRef.once("value", snap => {
        self.banner = snap.val()
      })

      try {
        const videoRef = animeRef.child(anime).child('episode').child(video)
        videoRef.once("value", snap => {
          try {
            self.video.channel = snap.val().channel
            self.video.id = snap.val().id
          }catch(e){}
        })
      }catch(e){}
    }
  },
  watch: {
    '$route' (to, from) {
      if(to){
        this.getParams()
      }
      else {
        this.getParams()
      }
    }
  },
  mounted(){
    this.getParams()
  }
}
</script>

<style scoped>
.player {
  margin-top: 0px;
  display: table-row;
  height: calc(100vw * 0.56);
  background-color: #282828;
  overflow: hidden;
}
iframe {
  width: 100%; height: 100%; border: none; margin: 0; padding: 0; display: block;
}
.banner {
  height: 100%;
  width: 100%;
  background: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
@media (min-width: 500px) {
  .player {
    height: 100%;
  }
  .other {
    width:100%;
    height: 350px;
  }
}
</style>
