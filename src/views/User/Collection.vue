<template>
  <div class="">
    <v-tabs
      grow
      color="black"
      dark
      :slider-color="$store.state.common.secondaryColor"
      v-model="activeTab"
    >
      <v-tab>已发布</v-tab>
      <v-tab-item class="window">
        <Published/>
      </v-tab-item>

      <v-tab>未发布</v-tab>
      <v-tab-item class="window">
        <Hidden/>
      </v-tab-item>

      <v-tab>收藏</v-tab>
      <v-tab-item class="window">
        开发中。。。
      </v-tab-item>
    </v-tabs>

    <v-btn
      :color="$store.state.common.secondaryColor"
      id="add"
      dark
      fixed
      right
      fab >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  components: {
    Published : () => import('@/components/User/Collection/Published'),
    Hidden : () => import('@/components/User/Collection/Hidden'),
  },
  data(){
    return{
      activeTab: null,
      max:2,
    }
  },
  methods:{

  },
}
</script>

<style scoped>
.window{
  height: calc( 100vh - 102px - 58px );
}
.d{
  border: solid;
  height: 50px;
}
#add{
  bottom: 70px;
}
</style>
