<template>
  <div id="app">
    <v-app>
      <navbar v-if="showNav"/>
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
  import { currentRef } from '@/firebaseConfig'
  import { info } from '@/firebaseConfig'
  import { mapState } from 'vuex'
  import popup from '@/views/Public/popup'
  import navbar from '@/views/Public/Navbar'
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
        this.$store.commit('public_dialogPop',false)
      },
      storeUser(uid){
        var self = this
        usersRef.child(uid).once('value').then(function(snapshot) {
          self.setRole(snapshot.val().role)
          self.setName(snapshot.val().id)
        });
      },
      setRole(r){
        this.$store.state.session.role = r
        this.$cookies.set('role',r)
      },
      setName(n){
        this.$store.state.session.name = n
        this.$cookies.set('username',n)
      }
    },
    mounted(){
      if(this.$cookies.isKey("uid")) {
        var uid = this.$cookies.get('uid')
        this.$store.state.session.uid = uid
        this.storeUser(uid)

        var onRef = usersRef.child(uid).child('online')
        var online = info.child('connected')
        online.on("value",function(snap){
          if(snap.val()){
            onRef.onDisconnect().remove()

            onRef.set(true)
          }
        });
      }

    },
    computed: {
      uid () {
        return this.$store.state.session.uid
      },
      showNav() {
        var path = this.$route.path
        if(path.startsWith('/controlpanel'))
          return false
        else if(path.startsWith('/error'))
          return false
        return true
      },
    },
    watch: {
      uid (v, o) {

        this.$cookies.set('uid',v)
        if(v==null){
          this.$cookies.remove("uid")
          this.$cookies.remove("role")
          this.$cookies.remove("username")
        }else{
          this.storeUser(v)
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
