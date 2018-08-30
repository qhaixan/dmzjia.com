<template id="">
  <div class="">
    <h2>Mutations + cookies</h2>
    {{$store.state.test.count}}
    <v-btn type="button" @click="add">+1</v-btn>
  </div>
</template>
<script>
  export default{
    methods: {
      add() {
        this.$store.commit('increment')
        this.$cookies.set('test_count',this.$store.state.test.count)
      }
    },
    mounted() {
      if(this.$cookies.isKey("test_count")) {
        var A = this.$cookies.get('test_count')
        this.$store.commit('loadCookies',A)
      }
    }
  }
</script>
