<template lang="html">
<div class="" style="background-color:#303030;">

<register           v-if="content=='register'"/>
<register_success   v-else-if="content=='register_success'"/>
<register_verify    v-else-if="content=='register_verify'"/>
<login              v-else-if="content=='login'"/>
<logout             v-else-if="content=='logout'"/>
<nologin            v-else-if="content=='nologin'"/>
<add_anime            v-else-if="content=='add_anime'"/>

<published          v-else-if="content=='action_published'"/>
<hidden             v-else-if="content=='action_hidden'"/>
<edit_anime         v-else-if="content=='edit_anime'"/>
<edit_episode         v-else-if="content=='edit_episode'"/>
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
    'logout' : () => import('@/components/Public/Popup/Logout'),
    'nologin' : () => import('@/components/Public/Popup/NoLogin'),
    'add_anime' : () => import('@/components/Public/Popup/AddAnime'),

    'published' : () => import('@/components/Public/PopupAction/Published'),
    'hidden' : () => import('@/components/Public/PopupAction/Hidden'),
    'edit_anime' : () => import('@/components/Public/PopupAction/EditAnime'),
    'edit_episode' : () => import('@/components/Public/PopupAction/EditEpisode')
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
