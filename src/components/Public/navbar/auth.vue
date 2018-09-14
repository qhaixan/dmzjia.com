<template lang="html">
  <circle-menu type="bottom" :number="4" colors="[ '#563761', 'rgb(255, 255, 102)', '#FFE26F', '#F3825F', '#F19584' ]">
    <button type="button" slot="item_btn"></button>
    <a slot="item_1" class="fa fa-twitter fa-lg" herf="#" ></a>
    <a slot="item_2" class="fa fa-weixin fa-lg" herf="#" ></a>
    <a slot="item_3" class="fa fa-weibo fa-lg" herf="#" ></a>
    <a slot="item_4" class="fa fa-github fa-lg" herf="#" ></a>
  </circle-menu>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
