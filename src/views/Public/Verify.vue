<template id="">
  <div class="">
    <h2>{{msg}}</h2>
  </div>
</template>
<script>
import { usersRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      msg:null,
    }
  },
  methods:{
    getUser(ref){
      var self = this
      usersRef.orderByChild('verificationLink').equalTo(ref).once('value', function (snapshot) {
        if(snapshot.val()!=null)
        {
          self.verify((snapshot.val())[0])
        }
      });
    },
    verify(uid){
      //usersRef.child(uid).child('role').set(1)
      this.msg = "认证成功！自动载入中..."
      var self = this
      setTimeout(function () {
        self.$store.commit('public_dialogContent',{content:'login',width:'350'})
        self.$router.replace({name:'home'})
      }, 3000)

    }
  },
  computed:{
    uid(){
      return this.uid
    }
  },
  watch:{
    uid(v,o){
      if(v){
        this.verify
      }
    }
  },
  mounted(){
    this.getUser(this.$route.params.ref)
  }
}
</script>
