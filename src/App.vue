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
  import { usersRef } from '@/firebaseConfig'
  import { mapState } from 'vuex';
  import popup from '@/views/Public/popup'
  import navbar from '@/views/Public/navbar'
  export default{
    firebase: {
      users: usersRef
    },
    components: {
      navbar,
      popup
    },
    methods: {
      hide(){
        this.$store.commit('public_dialogPop')
      },
      getUser(uid){
        var self = this
        usersRef.child(uid).once('value').then(function(snapshot) {
          self.setRole(snapshot.val().role)
          self.setName(snapshot.val().id)
        });
      },
      setRole(r){
        this.$store.state.session.role = r
      },
      setName(n){
        this.$store.state.session.name = n
      }
    },
    created(){

    },
    mounted(){
      if(this.$cookies.isKey("uid")) {
        var uid = this.$cookies.get('uid')
        this.$store.state.session.uid = uid
        this.getUser(uid)
      }
    },
    computed: {
      uid () {
        return this.$store.state.session.uid
      }
    },
    watch: {
      uid (v, o) {
        this.$cookies.set('uid',v)
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
