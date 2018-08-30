<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>
<script>
  import navbar from '@/views/Public/navbar'
  export default{
    components: {
      navbar
    },
    data() {
      return {

      }
    },
    methods: {

    },
    created(){
      /*
      if(!this.$cookies.isKey("user_session")) {
        var A = Math.floor(Math.random() * 100);
        this.$cookies.set("user_session",A)
      }*/
    }
  }
</script>
<style>

</style>
