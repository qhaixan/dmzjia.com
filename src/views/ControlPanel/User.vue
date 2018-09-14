<template lang="html">
  <div class="">
    <tableUser style="margin-bottom:80px;"/>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import tableUser from '@/components/ControlPanel/User/table'
export default {
  components: {
    tableUser
  }
}
</script>

<style scoped>
</style>
