<template>
  <v-carousel
    hide-delimiters
    :interval="interval"
    @click.native="click"
    ref="carousel"
    >
    <v-carousel-item
      class="image"
      v-for="(item,i) in cards"
      :key="i"
      :src="item.img"
      @click="$router.push({ name: 'watch', params: { id: item.id } })"
    >
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
      cards: [],
      interval:'2000'
    }
  },
  methods:{
    click (e) {
      if(e.target.className=='v-icon material-icons theme--dark'){
        this.interval='5000'
      }
    },
    hover (h) {
      if(h){
        //this.interval='500000000'
      }else{
        //this.interval='2000'
      }
    },
    loadCarousel(featured){
      this.cards = []
      var keys = Object.values(featured)
      for(var i=0;i<keys.length;i++){
        this.findAnime(keys[i].anime)
      }
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
