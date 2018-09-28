<template>
  <div class="">
    <div class="list-box">
      <router-link
        v-for="(a,i) in anime" :key="i"
        :to="{ name: 'watch', params: { id: a.id } }">
        <div class="list-item">
          <div class="image">
            <img :src="a.image">
          </div>
          <div class="name">
            <h3>{{a.title}}</h3>
            <span>{{a.len}} 集</span>
          </div>
        </div>
      </router-link>
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
          image:anime[i].imgH,
          len:episodes
        })
      }
      this.anime.reverse()
    }
  },
  mounted(){
    var self = this
    animeRef.orderByChild("publish").equalTo(true).limitToLast(8).on("value",function(snapshot){
      self.loadAnime(snapshot.val())
    });
  }
}
</script>

<style scoped>
</style>
