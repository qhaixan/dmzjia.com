<template>
  <div class="r_container">
    <div class="r_content">
      <div v-if="video.url==''" class="bannerz" :style="{ 'background-image': 'url(' + banner + ')' }">
        <span class="hint">请点击列表以开始播放</span>
      </div>
      <iframe v-if="video.source=='Openload'" height="100%" width="100%" :src="'https://openload.co/embed/'+video.url" allowfullscreen="allowfullscreen"></iframe>
      <iframe v-if="video.source=='GoogleDrive'" :src="'https://drive.google.com/file/d/'+video.url+'/preview'" allowfullscreen="allowfullscreen"></iframe>
      ​<iframe v-if="video.source=='YouTube'" :src="'https://www.youtube.com/embed/'+video.url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="margin-top:-24px;"></iframe>
      <iframe v-if="video.source=='Youku'" :src="'https://player.youku.com/embed/'+video.url+'==?autoplay=true'" frameborder=0 allowfullscreen="allowfullscreen" style="margin-top:-24px;"></iframe>
    </div>
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      video:{
        source:'',
        url:''
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
      this.video.source = ''
      this.video.url = ''
      const bannerRef = animeRef.child(anime).child('imgH')
      bannerRef.once("value", snap => {
        self.banner = snap.val()
      })

      try {
        const videoRef = animeRef.child(anime).child('episode').child(video)
        videoRef.once("value", snap => {
          try {
            self.video.source = snap.val().source
            self.video.url = snap.val().url
          }catch(e){}
        })
      }catch(e){}
    }
  },
  watch: {
    '$route.params' (to, from) {
      if(to){
        this.getParams()
      }
    },

  },
  mounted(){
    this.getParams()
  }
}
</script>

<style scoped>
.r_content{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.r_container{
  background-color: black;
  height: 0;
  padding-top: 56.25%;
  position: relative;
}
iframe {
  width: 100%; height: 100%; border: none; margin: 0; padding: 0; display: block;
}
.bannerz {
  height: 100%;
  width: 100%;
  background: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  box-shadow:inset 0 0 0 2000px rgba(40,40,40,0.85);
  font-weight: 600;
  text-align: center;

}
.hint{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
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
