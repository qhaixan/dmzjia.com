<template>
  <div class="main">
    <div class="portrait">
      <img :src="avatar" class="avatar">
      <div class="username">{{username}}</div>
    </div>
    <div class="function">
      <!--v-btn @click="verify">verify</v-btn-->
      <v-btn v-if="role>1" @click="toCP">Control Panel</v-btn><br/>
      <v-btn @click="logout">Logout</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm6Q1AijZfdxqq4YAoStjWW2RKkMya61SSFqveD772Thq1zU8w',
      avatar2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png'
    }
  },
  computed: {
    role () {
      return this.$store.state.session.role
    },
    username () {
      return this.$store.state.session.name
    }
  },
  methods:{
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
