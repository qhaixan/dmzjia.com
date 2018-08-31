<template lang="html">
  <div class="">
    Error
    <v-btn @click="back">Go Back</v-btn>
  </div>
</template>

<script>
export default {
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="css">
</style>
