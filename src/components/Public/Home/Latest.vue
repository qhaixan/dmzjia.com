<template>
  <div class="">
    <h2>最近添加：</h2>
    <div class="list-box">
      <div class="list-item" v-for="(a,i) in anime" :key="i">
        <div class="image">
          <img src="a.imgH">
        </div>
        {{a.title}}
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
    loadAnime(list){
      this.anime=[]
      var anime = Object.values(list)
      for(var i=0;i<anime.length;i++){
        console.log(anime[i].title)
        this.anime.push({
          title:anime[i].title
        })
      }
      this.anime.reverse()
    }
  },
  mounted(){
    var self = this
    animeRef.orderByChild("publish").equalTo(true).limitToLast(5).on("value",function(snapshot){
      self.loadAnime(snapshot.val())
    });
  }
}
</script>

<style scoped>
.list-box{
  border: solid;
  border-width: thin;
  border-color: grey;
}
.list-item{
  border-bottom: solid;
  border-width: thin;
  border-color: grey;
  padding: 5px;
}
.list-item > * {
  float: left;
}
.image{
  max-width: 30vw;
  width: 100px;
}
</style>
