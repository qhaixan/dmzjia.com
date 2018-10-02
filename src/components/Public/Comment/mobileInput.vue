<template>
  <v-text-field
      placeholder="说点什么吧"
      @click:append="alert('yay')"
      solo>
    <v-btn slot="append" @click="alert('yay')" outline small fab :color="$store.state.common.secondaryColor">
      <v-icon>send</v-icon>
    </v-btn>
  </v-text-field>
  <!--v-toolbar>
    <v-text-field
      placeholder="说点什么吧"
      solo
      append-outer-icon="send"
      class="tf"
    ></v-text-field>
  </v-toolbar-->
</template>

<script>
export default {
}
</script>

<style scoped>
.tf{

}
</style>
