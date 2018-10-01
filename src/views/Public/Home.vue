<template>
  <div class="wrapper home" ref="home">
    <Carousel class="carousel"/>
    <Latest class="latest"/>
  </div>
</template>

<script>
import Carousel from '@/components/Public/Home/Carousel'
import Latest from '@/components/Public/Home/Latest'
export default {
  components:{
    Carousel,
    Latest
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
