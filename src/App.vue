<template>
  <div id="app">
    <v-app>
      <navbar/>
      <router-view/>

      <div class="overlays" @click="hide" v-if="$store.state.public.overlay.show">

          <v-dialog v-model="$store.state.public.overlay.show" :width="$store.state.public.overlay.width">
            <popup/>
          </v-dialog>

      </div>
    </v-app>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
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
      if(this.$cookies.isKey("uid")) {
        this.$store.state.session.uid = this.$cookies.get('uid')
      }
    },
    computed: {
      uid () {
        return this.$cookies.get('uid')
      }
    },
    watch: {
      uid (v, o) {
        this.$store.state.session.uid = v
        if(v==null){
          this.$cookies.remove("uid")
        }
      }
    }
  }
</script>
<style scoped>
.overlays{
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
