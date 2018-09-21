<template>
  <div id="app" ref="app">
    <v-app dark style="background:black;">
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

        //var userStatus = usersRef.child(uid).child('online')
        var onlineUsers = onlineRef.child(uid)
        var checkOnline = info.child('connected')
        var sessionKey = this.sessionKey
        checkOnline.on("value",function(snap){
          if(snap.val()){
            onlineUsers.child(sessionKey).onDisconnect().remove()
            //userStatus.onDisconnect().remove()
            onlineUsers.child(sessionKey).set(true)
            //userStatus.set(true)
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
      },
      setRandomKey(){
        var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        this.$store.state.session.randomKey = key
      }
    },
    mounted(){
      this.setRandomKey()
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
      },
      sessionKey(){
        return this.$store.state.session.randomKey
      }
    },
    watch: {
      uid (v, o) {

        if(v==null){
          this.$cookies.remove("uid")
          this.$cookies.remove("role")
          this.$cookies.remove("username")
          //usersRef.child(o).child('online').remove()
          onlineRef.child(o).remove()

          this.$store.state.session.name = null
          this.$store.state.session.role = 0
          this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
        }else{
          this.$cookies.set('uid',v)
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
  background-color: rgba(0, 0, 0, 0.2);
}
.hello{
  background-color: white;
}
</style>
