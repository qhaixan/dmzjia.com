<template>
  <!--div>
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
    </div-->
    <div v-if="isMobile">
      <div class="spacer"><h2>最新添加：</h2></div>
      <div class="container">
        <router-link
          v-for="(a,i) in anime" :key="i"
          :to="{ name: 'watch', params: { id: a.id } }">
          <div class="card">
            <div class="imageH">
              <img :src="a.image">
            </div>
            {{a.title}}
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
.spacer{
  height: 40px;
  padding: 5px;
}
.container{
  width: 100vw;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  padding: 0;
}
.card{
  max-height: calc( 100vw * 0.53 );
  width: 30vw;
  margin-left: 2px;
  margin-right: 2px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}
.imageH {
  height: 42vw;
  text-align: center;
}
.imageH > img{
  max-width: 100%;
  max-height: 100%;
}
a {
  text-decoration: none;
  color: white;
}
@media (min-width: 500px) {
  .card{
    max-height: calc( 100vw * 0.25 );
    width: calc( 100vw * 0.13 );
  }
  .imageH {
    height: 20vw;
    text-align: center;
  }
  .container {
    width: 100%;
    overflow: hidden;
  }
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
