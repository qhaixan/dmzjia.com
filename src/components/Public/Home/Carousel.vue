<template>
  <v-carousel
  class="frame"
    hide-delimiters
    :interval="interval"
    ref="carousel"
    >
    <v-carousel-item
      class="image"
      @mouseover="slow()"
      @mouseleave="fast()"
      v-touch="{
        left: () => slow(),
        right: () => slow(),
      }"
      v-for="(item,i) in cards"
      :key="i"

      @click="$router.push({ name: 'watch', params: { id: item.id } })"
    >
      <img :src="item.img">
      <div class="title">
        <v-chip
          color="black"
        ><span class="font" style="color:white;">{{item.title}}</span></v-chip>
      </div>
    </v-carousel-item>

  </v-carousel>
</template>

<script>
import { mapState } from 'vuex'
import { animeRef } from '@/firebaseConfig'
import { featureRef } from '@/firebaseConfig'
export default {
  data(){
    return {
      cards:[
        {title:null,img:'http://nunsontherun.co.uk/assets/images/site/loading.gif',id:null}
      ],
      interval:'500',
      f:'3000',
      s:'6000'
    }
  },
  methods:{
    fast(){
      this.interval=this.f
    },
    slow(){
      this.interval=this.s
    },
    loadCarousel(featured){
      this.cards = []
      var keys = Object.values(featured)
      for(var i=0;i<keys.length;i++){
        this.findAnime(keys[i].anime)
      }
      var self = this
      setTimeout(function () {
        self.interval = self.f
      }, 600)
    },
    findAnime(key){
      var self = this
      animeRef.child(key).once("value",function(snapshot){
        self.cards.push({
          id: key,
          img: snapshot.val().imgH,
          title: snapshot.val().title
        })
      });
    }
  },
  mounted(){
    var self = this
    featureRef.once("value",function(snapshot){
      self.loadCarousel(snapshot.val())
    });


  },
  computed: {
    isMobile () {
      return this.$store.state.isMobile
    }
  }
}
</script>

<style scoped>
.frame{
  background: black;
  max-height: calc( 100vw * (9/16) );
}
.image{
  text-align: center;
}
.image img{
  max-width: 100%;
  height: 100%;
}
@media screen and (min-width: 425px) {
  .frame{
    max-height: 50vh!important;
  }
}
.font {
  font-size: calc( 100vw / 26 );
}
@media (min-width: 700px) {
  .font {
    font-size: 20px;
  }
}
.title{
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align:center;
}
</style>
