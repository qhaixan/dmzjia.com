<template>
  <v-carousel
    v-if="cards"
    hide-delimiters
    :value='1'
    >
    <v-carousel-item
      class="image"
      v-for="(item,i) in cards"
      :key="i"
      :src="item.img"
      @click="$router.push({ name: 'watch', params: { id: item.id } })"
    >
      <div class="title">
        <v-chip :small="isMobile"><span class="font">{{item.title}}</span></v-chip>
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
          title: snapshot.val().title
        })
      });
    }
  },
  mounted(){
    var self = this
    featureRef.on("value",function(snapshot){
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
