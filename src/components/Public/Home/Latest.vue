<template>
<div>
  <div class="spacer">
    <h2>最新添加：</h2>
  </div>
  <div :style="containerStyle">
    <div v-for="(a,i) in anime" :style="cardStyle(i)" :key="i" class="card-card">
      <router-link :to="{ name: 'watch', params: { id: a.id } }">
        <v-card>
          <v-img :src="a.image" aspect-ratio="0.577"></v-img>

          <v-card-title primary-title>
            <div class="card-title" :style="titleStyle">
              {{a.title}}
            </div>
          </v-card-title>
        </v-card>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data(){
    return {
      anime: []
    }
  },
  methods:{
    cardStyle(i){
      var share = 'display: inline-block;'
      if(this.isMobile){
        return share+'margin-right:5px;'+'max-width:25%;min-width:25%;'
      }
      return share+'margin-left:10px;margin-right:10px;margin-bottom:15px;'+'max-width:16%;min-width:16%;'
    },
    loadAnime(list){
      this.anime=[]
      var anime = Object.values(list)
      var keys = []
      var i=0
      for(var k in list){
        keys[i] = k
        i+=1;
      }
      for(var i=0;i<anime.length;i++){
        var episodes = Object.values(anime[i].episode).length
        this.anime.push({
          id: keys[i],
          title:anime[i].title,
          image:anime[i].imgV,
          len:episodes
        })
      }
      this.anime.reverse()
    }
  },
  computed:{
    isMobile(){
      return this.$store.state.isMobile
    },
    titleStyle(){
      if(this.isMobile){
        return 'height:32px;'+
        'line-height: 14px;'+
        'margin-top:-20px;'
      }
      return 'height:40px;'+
      'text-align:center;'+
      'line-height: 20px;'
    },
    containerStyle(){
      if(this.isMobile){
        return 'overflow-x:scroll; white-space: nowrap; width:100vw;'
      }
      return 'margin-right:-130px;'
    }
  },
  mounted(){
    var self = this
    animeRef.limitToLast(5).on("value",function(snapshot){
      self.loadAnime(snapshot.val())
    });
  }
}
</script>

<style scoped>
.card-title{
  text-align: center;
  margin:-15px;
  width:calc( 100% + 30px );
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
}
.spacer{
  height: 40px;
  padding: 5px;
}
a {
  text-decoration: none;
  color: white;
}
</style>
