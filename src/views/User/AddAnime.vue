<template>
  <div class="">
    <h2>我的动漫：</h2>
    <table class="viewTable">
      <tr>
        <td><h3>已发布</h3></td>
        <td></td>
      </tr>
      <tr>
        <td><Published class="published"/></td>
        <td></td>
      </tr>
      <tr>
        <td><h3>未发布</h3></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
    </table>
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
import Published from '@/components/User/AddAnime/Published'
export default {
  components: {
    Published
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
