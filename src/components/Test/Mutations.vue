<template id="">
  <div class="">
    <h2>Mutations + cookies + watch</h2>
    {{$store.state.test.count}}
    <v-btn type="button" @click="add">+1</v-btn>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
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
    },
    computed: {
      count () {
        return this.$store.state.test.count
      }
    },
    watch: {
      count (v, o) {
        console.log(o)
      }
    },
  }
</script>
<style scoped>
</style>
