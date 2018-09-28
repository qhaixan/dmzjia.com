<template lang="html">
  <div id="nav">
    <mobileNav v-if="isMobile" :routes="routes"/>


    <template v-else>
      <pcNav :routes="routes"/>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components:{
    'mobileNav' : () => import('@/components/Public/navbar/mobileNav'),
    'pcNav' : () => import('@/components/Public/navbar/pcNav')
  },
  data(){
    return {
      routes:[
        {
          text:'首页',
          icon:'home',
          route:'home',
          link:'/'
        },
        {
          text:'列表',
          icon:'list',
          route:'list',
          link:'/list'
        },
        {
          text:'留言区',
          icon:'textsms',
          route:'comment',
          link:'/comment'
        }
      ]
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.isMobile
    }
  },
  mounted() {

  },

}
</script>

<style scoped>
</style>
