<template>
  <div class="container">
    <textf class="tf"/>
  </div>
</template>

<script>
export default {
  components: {
    'textf' : () => import('@/components/Public/Comment/mobileInput'),
  }
}
</script>

<style scoped>
.container{
  position: relative;
}
.tf{
  position: fixed;
  border: solid;
  border-color: black;
  bottom:22px;
  width: 100%;
  background-color: black;
  left:0;
}
</style>
