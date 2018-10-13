<template>
  <div class="main">
    <div class="portrait">
      <img :src="avatar" class="avatar" @click="chgAvatar" @error="imageLoadOnError">
      <div class="username" @click="chgUsername">
        <span v-if="name.length>0">
          {{name}}
        </span><br>
        <span v-if="name.length>0" style="font-size:50%;margin-top:-10px;">（登入账号：{{username}}）</span>
        <span v-else>{{username}}</span>
      </div>
    </div>
    <div class="function">
      <!--v-btn @click="verify">verify</v-btn-->
      <v-btn v-if="role>1" @click="toCP">Control Panel</v-btn><br/>
      <v-btn @click="logout">注销</v-btn>
    </div>
  </div>
</template>

<script>
import { usersRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxC8tK9WH3CbaNFjiCcOkdiJlCyTL9IObOMJN63ECX_R-DmN8Jhw',
      name: ''
    }
  },
  mounted(){
    this.getName()
  },
  computed: {
    role () {
      return this.$store.state.session.role
    },
    username () {
      return this.$store.state.session.name
    },
    uid(){
      return this.$store.state.session.uid
    }
  },
  methods:{
    imageLoadOnError (e) {
      usersRef.child(this.uid).child('avatar').set('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxC8tK9WH3CbaNFjiCcOkdiJlCyTL9IObOMJN63ECX_R-DmN8Jhw')
    },
    chgUsername(){
      var self = this
      this.$store.commit('public_dialogAction',{content:'edit_profile',width:'350',action:{
        child:'name',
        title:'更改昵称',
        label:'新昵称',
        value:self.name
      }})
    },
    chgAvatar(){
      var self = this
      this.$store.commit('public_dialogAction',{content:'edit_profile',width:'350',action:{
        child:'avatar',
        title:'更改头像',
        label:'图片链接',
        value:self.avatar
      }})
    },
    getName(){
      var self = this

      usersRef.child(this.uid).on('value',function(snapshot) {

        if(snapshot.val().name && snapshot.val().name.length>0){
          self.name = snapshot.val().name
        }
        if(snapshot.val().avatar && snapshot.val().avatar.length>1){
          self.avatar = snapshot.val().avatar
        }

      })

    },
    logout(){
      this.$store.commit('public_dialogContent',{content:'logout',width:'250'})
    },
    toCP(){
      this.$router.push('/controlpanel')
    }
  }
}
</script>

<style scoped>
.portrait{
  text-align: center;
}
.avatar{
  bottom: 0;
  border-radius: 50%;
  width: 25vw;
  height: 25vw;
  object-fit: cover;
}
#icon{
  font-size: 40vw;
  margin-top: 10vw;
}
.username{
  font-size: 8vw;
}
.main{
  position: relative;
}
.function{
  width: 100vw;
  text-align: center;
  position: absolute;
  padding-bottom: 56px;
}
</style>
