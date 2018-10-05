<template>
  <div class="list-box">
    <div class="list-item"
      v-for="(a,i) in anime" :key="i"
      @click="action(a.id)"
      >
      <div class="image">
        <img :src="a.image">
      </div>
      <div class="name">
        <h3>{{a.title}}</h3>
        <span>{{a.len}} 集</span>
      </div>
    </div>
  </div>
</template>

<script>
import { hiddenAniRef } from '@/firebaseConfig'
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
    action(id){
      this.$store.commit('public_dialogAction',{content:'action_hidden',width:'200',action:id})
    },
    loadList(){
      var self = this
      hiddenAniRef.on('value',function(snapshot) {
        self.anime = []
        snapshot.forEach(function(childSnapshot) {
          self.findAnime(childSnapshot.key)
        })
      })
    },
    findAnime(key){
      var self = this
      hiddenAniRef.child(key).once('value',function(snap){
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
  height: 100%;
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
