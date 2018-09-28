<template>
  <v-carousel
    v-if="cards"
    >
    <v-carousel-item
      v-for="(item,i) in cards"
      :key="i"
      :src="item.img"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
import { featureRef } from '@/firebaseConfig'
export default {
  data(){
    return {
      cards: []
    }
  },
  methods:{
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
        })
      });
    }
  },
  mounted(){
    var self = this
    featureRef.on("value",function(snapshot){
      self.loadCarousel(snapshot.val())
    });
  }
}
</script>

<style scoped>
</style>
