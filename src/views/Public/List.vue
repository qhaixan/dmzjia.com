<template>
  <div class="wrapper animelist">
    <div v-if="query" class="notifyQuery" :style="'background:'+queryColor+';'">
      <span v-if="!loading">以"{{query}}"搜查到{{anime.length}}个结果 <span class="clearQuery" @click="clearQuery()">显示所有</span></span>
      <span v-else>搜索中</span>
    </div>

    <div v-if="loading" :class="view">
      <v-progress-circular
      class="animation"
        indeterminate
        color="#ffd400"
      ></v-progress-circular>
    </div>
    <div class="list-box" v-else>
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
    <div hidden v-if="anime"><v-btn @click="paginate(0)">Prev</v-btn><v-btn @click="paginate(1)">Next</v-btn></div>
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
export default {
  data(){
    return {
      anime: [],
      pageQuery:{
        cursor: null,
        pageSize: 10
      },
      loading:true
    }
  },
  methods:{
    clearQuery(){
      this.$router.push({ name: 'list'})
      location.reload()
    },
    paginate(){
      this.anime = []
      var cursor = this.pageQuery.cursor
      var size = this.pageQuery.pageSize

      if(!cursor){
        var queryString = animeRef.orderByChild('updatedTimeR').limitToFirst(size)
      }else{
        if(dir==1)
          var queryString = animeRef.orderByKey().startAt(cursor+1).limitToFirst(size)
        else
          var queryString = animeRef.orderByKey().endAt(cursor).limitToFirst(size)
      }
      var self = this
      queryString.once('value',function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          self.findAnime(childSnapshot.key)
        })
        self.loading = false
      })
    },
    findAnime(key){
      var self = this
      this.pageQuery.cursor = key
      animeRef.child(key).once('value',function(snap){
        self.anime.push({
          id: key,
          title: snap.val().title,
          image: snap.val().imgH,
          len: Object.values(snap.val().episode).length
        })
      })
    },
    queryAnime(){
      var query = this.query
      var self = this
      animeRef.once('value',function(snap){//go through every anime
        snap.forEach(function(ani) {
          var matchTitle = ani.val().title.toLowerCase().includes(query)
          try{
            var matchKeyword = ani.val().keyword.toLowerCase().includes(query)
          }catch(err){
            var matchKeyword = null
          }
          if(matchTitle || matchKeyword){
            self.anime.push({
              id: ani.key,
              title: ani.val().title,
              image: ani.val().imgH,
              len: Object.values(ani.val().episode).length
            })
          }
        })
        self.loading = false
      })
    },
    loadList(){
      this.anime = []
      this.loading = true
      if(this.query){
        this.queryAnime()
      }else{
        this.paginate()
        this.anime.reverse()
      }
    }
  },
  mounted(){
    this.loadList()
  },
  computed: {
    isMobile(){
      return this.$store.state.isMobile
    },
    query(){
      if(this.$route.query.keyword)
      {
        return decodeURIComponent(this.$route.query.keyword)
      }else{
        return null
      }

    },
    queryColor(){
      if(this.loading){
        return '#ffd400'
      }
      else if (this.anime.length==0) {
        return this.$store.state.common.secondaryColor
      }
      return '#00a00a'
    },
    view(){
      if(this.isMobile){
        return 'mloader'
      }else{
        return 'loader'
      }
    }
  },
  watch:{
    query(v,o){
      if(v){
        this.loadList()
      }
    }
  }
}
</script>

<style scoped>
@import './../../static/styles/grid.css';
@import './../../static/styles/grid-list.css';
.clearQuery:hover{
  cursor: pointer;
  color: #60daff;
}
.clearQuery{
  color:#000f75;
  font-weight:600;
}
.loader{
  width: 100%;
  position: relative;
  height: calc( 100vh - 85px );
}
.mloader{
  width: 100%;
  position: relative;
  height: calc( 100vh - 168px );
}
.animation{
  width: 20px;
  height: 20px;
  position: fixed;
  top:50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
}
.notifyQuery{
  width:100%;
  text-align:center;
}
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
  text-align: center;
}
.image > img {
  max-width: 100%;
  height: calc( 100px * 0.56 );
}
.name {
  padding-left: 5px;
  white-space: nowrap;
  width: 70vw;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name > span {
  color: grey;
}

@media (min-width: 1024px) {
  .name {
    width: 100%;
  }
  .list-item:hover{
    border-bottom: solid;
    border-width: thin;
    border-color: #d10000;
  }
}
</style>
