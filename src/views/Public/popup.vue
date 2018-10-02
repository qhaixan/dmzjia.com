<template lang="html">
<div class="" style="background-color:#303030;">

<register           v-if="content=='register'"/>
<register_success   v-else-if="content=='register_success'"/>
<register_verify    v-else-if="content=='register_verify'"/>
<login              v-else-if="content=='login'"/>
<logout             v-else-if="content=='logout'"/>

</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    'register' : () => import('@/components/Public/Popup/Register'),
    'register_success' : () => import('@/components/Public/Popup/RegisterSuccess'),
    'register_verify' : () => import('@/components/Public/Popup/RegisterVerify'),
    'login' : () => import('@/components/Public/Popup/LogIn'),
    'logout' : () => import('@/components/Public/Popup/Logout')
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
