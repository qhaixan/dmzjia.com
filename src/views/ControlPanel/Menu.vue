<template lang="html">
  <div id="inspire" v-if="authorized">
    <sideMenu />
    <topMenu />
    <v-content>
      <!--v-container fluid fill-height>
        <v-layout-->
          <router-view/>
        <!--/v-layout>
      </v-container-->
    </v-content>

  </div>
  <error v-else/>
</template>

<script>
import error from '@/views/Public/Error'
import sideMenu from '@/components/ControlPanel/Menu/side'
import topMenu from '@/components/ControlPanel/Menu/top'
export default {
  components: {
    sideMenu,
    topMenu,
    error
  },
  data() {
    return {
      authorized:false
    }
  },
  methods: {
    logout(){
      this.$router.push({ path: '/' })
    }
  },
  mounted(){
    if(this.$cookies.get('role')>1){
      this.authorized = true
    }else{

    }
  }
}
</script>

<style lang="css">
</style>
