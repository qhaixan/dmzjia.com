<template lang="html">
  <v-toolbar
    color="teal darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="$store.state.controlpanel.menu.drawer = !$store.state.controlpanel.menu.drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Control Panel</span>
    </v-toolbar-title>
    <!--v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    ></v-text-field-->
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-tooltip bottom>
      <v-btn icon @click="logout" slot="activator">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <span>Exit</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout(){
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="css">
</style>
