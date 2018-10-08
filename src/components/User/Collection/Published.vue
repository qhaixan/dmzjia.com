<template>
  <div class="list-box">
    <span v-if="uid==null">请先登入</span>
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
import { animeRef } from '@/firebaseConfig'
export default {
  data() {
    return{
      anime: [],
    }
  },
  mounted(){
    var self = this
    this.$nextTick(() => {
      if(!self.uid){
        //self.$store.commit('public_dialogContent',{content:'nologin',width:'350'})
        self.$router.push({name:'home'})

      }else{
        self.loadList()
      }
    });

  },
  methods:{
    action(id){
      this.$store.commit('public_dialogAction',{content:'action_published',width:'200',action:id})
    },
    loadList(){
      var self = this
      animeRef.on('value',function(snapshot) {
        self.anime = []
        snapshot.forEach(function(childSnapshot) {
          if(childSnapshot.val().owner==self.uid){
            try{
              var img = childSnapshot.val().imgH
            }catch(err){
              var img = null
            }

            try{
              var len = Object.values(childSnapshot.val().episode).length
            }catch(err){
              var len = 0
            }
            self.anime.push({
              id: childSnapshot.key,
              title: childSnapshot.val().title,
              image: img,
              len: len
            })
          }
        })
      })
    }
  },
  computed:{
    uid(){
      return this.$store.state.session.uid
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
