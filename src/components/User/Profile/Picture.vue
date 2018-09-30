<template>
  <div class="">
    {{username}}
    <br>
    <v-btn @click="toCP" v-if="role>1">ControlPanel</v-btn>
    <br>
    <v-btn @click="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    role () {
      return this.$store.state.session.role
    },
    username () {
      return this.$store.state.session.name
    }
  },
  methods:{
    verify(){
      var service_id = "dmzjia_noreply";
      var template_id = "template_uJaoKiCR";
      var params = {
        "to_email":"999kaitokid@gmail.com",
        "from_name":"d",
        "to_name":"d",
        "content":"d"
      }
      /*
      window.emailjs.send(service_id,template_id,params)
    	.then(function(){
         alert("Sent!");
       }, function(err) {
         alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
      });*/
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
</style>
