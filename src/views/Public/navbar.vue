<template lang="html">
  <div id="nav">
    <mobileNav v-if="isMobile" :routes="routes"/>


    <template v-else>
      <pcNav :routes="routes"/>
    </template>
  </div>
</template>

<script>
//import mobileNav from '@/components/Public/navbar/mobileNav'
//import pcNav from '@/components/Public/navbar/pcNav'
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
          text:'Home',
          icon:'home',
          route:'home',
          link:'/'
        },
        {
          text:'About',
          icon:'help',
          route:'about',
          link:'/about'
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
