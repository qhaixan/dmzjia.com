<template lang="html">
<div class="" style="background-color:white;">

<register           v-if="content=='register'"/>
<register_success   v-else-if="content=='success'"/>

</div>
</template>

<script>
import { mapState } from 'vuex'
import register from '@/components/Public/Popup/Register'
import register_success from '@/components/Public/Popup/RegisterSuccess'
export default {
  components: {
    register,
    register_success
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
