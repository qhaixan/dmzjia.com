<template lang="html">
  <div class="">
    <tableUser/>
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

<style lang="css">
</style>
