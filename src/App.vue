<template>
  <div id="app" ref="app">
    <v-app>
      <navbar v-if="showNav"/>
      <router-view/>
      <div v-if="isMobile" style="margin-bottom:56px;"></div>
      <!--overlay & popup-->
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
  import { onlineRef } from '@/firebaseConfig'
  import { info } from '@/firebaseConfig'
  import { mapState } from 'vuex'
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
        this.$store.commit('public_dialogPop',false)
      },
      storeUser(uid){
        var self = this
        usersRef.child(uid).once('value').then(function(snapshot) {
          self.setRole(snapshot.val().role)
          self.setName(snapshot.val().id)
        });

        var userStatus = usersRef.child(uid).child('online')
        var onlineUsers = onlineRef.child(uid)
        var checkOnline = info.child('connected')
        checkOnline.on("value",function(snap){
          if(snap.val()){
            onlineUsers.onDisconnect().remove()
            userStatus.onDisconnect().remove()
            onlineUsers.set(true)
            userStatus.set(true)
          }
        });

        var self = this
        onlineUsers.on("value",function(snap){//if user logout on other tab
          if(snap.val()==null){
            self.$store.state.session.uid = null
          }
        });
      },
      setRole(r){
        this.$store.state.session.role = r
        this.$cookies.set('role',r)
      },
      setName(n){
        this.$store.state.session.name = n
        this.$cookies.set('username',n)
      },
      checkCookies(){
        if(this.$cookies.isKey("uid")) {
          var uid = this.$cookies.get('uid')
          this.$store.state.session.uid = uid
          this.storeUser(uid)
        }else{
          this.$store.state.session.uid = null
        }
      },
      checkAgent(){
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
          ){
            this.$store.state.isMobile = true
        }
        else {
            this.$store.state.isMobile = false
        }
      }
    },
    mounted(){
      this.checkAgent()
      this.checkCookies()
    },
    computed: {
      uid () {
        return this.$store.state.session.uid
      },
      route() {
        return this.$route.path
      },
      showNav() {
        var path = this.$route.path
        if(path.startsWith('/controlpanel'))
        {
          return false
        }
        else if(path.startsWith('/error'))
        {
          return false
        }
        return true
      },
      isMobile () {
        return this.$store.state.isMobile
      }
    },
    watch: {
      uid (v, o) {

        this.$cookies.set('uid',v)
        if(v==null){
          this.$cookies.remove("uid")
          this.$cookies.remove("role")
          this.$cookies.remove("username")
          usersRef.child(o).child('online').remove()
          onlineRef.child(o).remove()

          this.$store.state.session.name = null
          this.$store.state.session.role = 0
          this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
        }else{
          this.storeUser(v)
        }
      },
      route (v,o) {
        this.checkCookies()
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
