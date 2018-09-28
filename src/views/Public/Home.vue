<template>
  <div class="wrapper">
    <Carousel class="carousel"/>
  </div>
</template>

<script>
import Carousel from '@/components/Public/Home/Carousel'
export default {
  components:{
    Carousel
  }
}
</script>
<style scoped>
@import './../../static/styles/grid.css';
@import './../../static/styles/grid-home.css';
.carousel{
  height: 0;
  padding-top: 56.25%;
}
</style>
