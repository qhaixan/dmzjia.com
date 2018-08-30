<template lang="html">
  <div id="inspire">
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
</template>

<script>
import sideMenu from '@/components/ControlPanel/Menu/side'
import topMenu from '@/components/ControlPanel/Menu/top'
export default {
  components: {
    sideMenu,
    topMenu
  },
  data() {
    return {
    }
  },
  methods: {
    logout(){
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="css">
</style>
