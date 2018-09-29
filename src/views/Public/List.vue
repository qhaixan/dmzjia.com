<template>
  <div class="">
    <div v-if="query" style="width:100%;text-align:center;background:#007ed8;">搜查到{{anime.length}}个结果</div>
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
        pageSize: 99999
      }
    }
  },
  methods:{
    paginate(dir){
      this.anime = []
      var cursor = this.pageQuery.cursor
      var size = this.pageQuery.pageSize

      if(!cursor){
        var queryString = animeRef.orderByKey().limitToFirst(size)
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
    queryAnime(query){
      var self = this
      animeRef.once('value',function(snap){
        snap.forEach(function(childSnapshot) {
          self.compareTitle(childSnapshot.key)
        })
      })
    },
    compareTitle(key){
      var query = this.query
      var self = this
      animeRef.child(key).once('value',function(snap){
        var title = snap.val().title.toLowerCase()
        var keyword = title //+ snap.val().keyword.toLowerCase() + title
        if(keyword.includes(query)){
          self.findAnime(key)
        }
      })
    },
    loadList(){
      this.anime = []
      if(this.query){
        this.queryAnime(this.query)
      }else{
        this.paginate()
      }
    }
  },
  mounted(){
    this.loadList()
  },
  computed: {
    query(){
      if(this.$route.query.keyword)
      {
        return decodeURIComponent(this.$route.query.keyword)
      }else{
        return null
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
