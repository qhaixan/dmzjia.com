<template lang="html">
<div class="" style="background-color:#303030;">

<register           v-if="content=='register'"/>
<register_success   v-else-if="content=='register_success'"/>
<login              v-else-if="content=='login'"/>
<logout             v-else-if="content=='logout'"/>

</div>
</template>

<script>
import { mapState } from 'vuex'
import register from '@/components/Public/Popup/Register'
import register_success from '@/components/Public/Popup/RegisterSuccess'
import login from '@/components/Public/Popup/LogIn'
import logout from '@/components/Public/Popup/Logout'
export default {
  components: {
    register,
    register_success,
    login,
    logout
  },
  computed: {
    content () {
      return this.$store.state.public.overlay.content
    }
  }
}
</script>

<style scoped>
</style>
