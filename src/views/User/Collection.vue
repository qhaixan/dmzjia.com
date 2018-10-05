<template>
  <div class="">
    <v-tabs
      grow
      color="black"
      dark
      :slider-color="$store.state.common.secondaryColor"
      v-touch="{
        left: () => assignSwipeValue('Left'),
        right: () => assignSwipeValue('Right')
        }"
      v-model="active"
    >
      <v-tab>已发布</v-tab>
      <v-tab-item class="window">
        ad
      </v-tab-item>

      <v-tab>未发布</v-tab>
      <v-tab-item class="window">
        b
      </v-tab-item>

      <v-tab>收藏</v-tab>
      <v-tab-item class="window">
        c
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
import Published from '@/components/User/Collection/Published'
export default {
  components: {
    Published
  },
  data(){
    return{
      active: null,
      max:2
    }
  },
  methods:{
    assignSwipeValue(direction) {
      if(direction=='Left'){//+1
        this.next(1)
      }else if(direction=='Right'){
        this.next(-1)
      }
    },
    next (v) {
      if((v<0 && this.active>0)||(v>0 && this.active<this.max)){
        this.active+=v
      }
    },
  }
}
</script>

<style scoped>
.viewTable{
  width: 100%;
}
.viewTable > tr > td:nth-child(2){
  width: 15vw;
}
.viewTable > tr:nth-child(odd){
  height: 30px;
}
.viewTable > tr:nth-child(even){
  height: 300px;
}
.viewTable > tr:nth-child(even) > td:nth-child(1){
  background-color: white;
}
.published {

}
#add{
  bottom: 70px;
}
</style>
