<template id="">
  <div class="">
    <h2>Mutations + watch</h2>
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
      }
    },
    mounted() {

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
