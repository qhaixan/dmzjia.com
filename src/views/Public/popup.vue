<template lang="html">
<div class="" style="background-color:white;">
<register v-if="content=='register'"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import register from '@/components/Public/Popup/Register'
export default {
  components: {
    register
  },
  computed: {
    content () {
      return this.$store.state.public.overlay.content
    }
  }
}
</script>

<style lang="css">
</style>
