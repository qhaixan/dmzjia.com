<template id="">
  <div class="">
    <h2 :style="{color:color}">{{msg}}</h2>
  </div>
</template>
<script>
import { usersRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      msg:"认证处理中，请稍等...",
      color:"yellow"
    }
  },
  methods:{
    getUser(ref){
      if(!ref||ref.length!=32){
        throw "Error: invalid verification link"
      }
      var self = this
      usersRef.orderByChild('verificationLink').equalTo(ref).once('value', function (snapshot) {
        if(snapshot.val()!=null)
        {
          self.verify(Object.keys(snapshot.val())[0])
        }else{
          self.msg("认证失败，请联络管理员或使用别的电邮.")
          self.color = "red"
        }
      });
    },
    verify(uid){
      var self = this
      usersRef.child(uid).child('role').set(1).then(()=>{
        self.msg = "认证成功！自动载入中..."
        self.color = "#00ce0d"
      })



      setTimeout(function () {
        self.$store.commit('public_dialogContent',{content:'login',width:'350'})
        self.$router.replace({name:'home'})
      }, 3000)

    }
  },
  mounted(){
    this.getUser(this.$route.params.ref)
  }
}
</script>
