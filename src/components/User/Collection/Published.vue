<template>
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
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data() {
    return{
      anime: [],
    }
  },
  mounted(){
    this.loadList()
  },
  methods:{
    loadList(){
      var self = this
      animeRef.once('value',function(snapshot) {
        self.anime = []
        snapshot.forEach(function(childSnapshot) {
          self.findAnime(childSnapshot.key)
        })
      })
    },
    findAnime(key){
      var self = this
      animeRef.child(key).once('value',function(snap){
        self.anime.push({
          id: key,
          title: snap.val().title,
          image: snap.val().imgH,
          len: Object.values(snap.val().episode).length
        })
      })
    }
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
  overflow-y: auto;
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
  text-align: center;
}
.image > img {
  max-width: 100%;
  height: calc( 100px * 0.56 );
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
