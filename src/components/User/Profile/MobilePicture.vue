<template>
  <div class="main">
    <div class="portrait">
      <img :src="avatar" class="avatar">
      <div class="username">
        <span v-if="name">{{name}}</span>
        <span v-else="name">{{username}}</span>
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
      name: null
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
    getName(){
      var self = this

      usersRef.child(this.uid).once('value',function(snapshot) {

        if(snapshot.val().name){
          self.name = snapshot.val().name
        }
        if(snapshot.val().avatar){
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
