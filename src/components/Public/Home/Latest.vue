<template>
  <div class="">
    <h2>最新添加：</h2>
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
    animeRef.limitToLast(6).on("value",function(snapshot){
      self.loadAnime(snapshot.val())
    });
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.list-box{
  border: none;
  border-width: thin;
  border-color: grey;
  border-bottom: none;
}
.list-item{
  border-bottom: solid;
  border-width: thin;
  border-color: #333333;
  padding: 5px;
  display: flex;
}

.image{
  max-width: 30vw;
  width: 100px;
}
.image > img {
  max-width: 100%;
}
.name {
  padding-left: 5px;
  white-space: nowrap;
  width: 69vw;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name > span {
  color: grey;
}
</style>
