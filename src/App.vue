<template>
  <div id="app">
    <navbar/>
    <router-view/>

    <div class="overlay" @click="hide" v-if="$store.state.public.overlay.show">
      <v-dialog v-model="$store.state.public.overlay.show" :width="$store.state.public.overlay.width">
        <popup/>
      </v-dialog>
    </div>

  </div>
</template>
<script>
  import popup from '@/views/Public/popup'
  import navbar from '@/views/Public/navbar'
  export default{
    components: {
      navbar,
      popup
    },
    data() {
      return {
        style:'background-color:blue;'
      }
    },
    methods: {
      hide(){
        this.$store.commit('public_dialogPop')
      }
    },
    created(){
      /*
      if(!this.$cookies.isKey("user_session")) {
        var A = Math.floor(Math.random() * 100);
        this.$cookies.set("user_session",A)
      }*/
    }
  }
</script>
<style scoped>
.overlay{
  height:100vh;
  width:100vw;
  position:absolute;
  top:0;
  left:0;
  background-color: rgba(158, 158, 158, 0.5);
}
.hello{
  background-color: white;
}
</style>
