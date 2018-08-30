<template id="">
  <div class="">
    <h2>Add Product (Firebase)</h2>
    <div class="list">
      <ul>
        <li v-for="p in products">{{p.desc}}</li>
      </ul>
    </div>
    count: {{productCount()}}<br>
    <v-layout row wrap>

      <v-flex xs12 sm6 md3 lg2>
        <v-text-field label="description:" v-model="desc" @keydown.enter="add"/>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-btn @click="add">Add</v-btn>
      </v-flex>
    </v-layout>

  </div>
</template>
<script>
  import { testAddRef } from '@/firebaseConfig'
  export default{
    firebase: {
      products: testAddRef
    },
    data() {
      return {
        desc: ''
      }
    },
    methods: {
      add(){
        if(this.desc!=''){
          testAddRef.push({ desc: this.desc })
          this.desc = ''
        }
      },
      productCount(){
        return this.products.length;
      }
    }
  }
</script>
<style scoped="scoped">
  .list{
    height: 100px;
    width: 180px;
    border: solid;
    border-width: 0.5px;
    overflow-y: auto;
  }
</style>
