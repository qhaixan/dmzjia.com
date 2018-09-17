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
      <v-flex xs8 sm3 md2>
        <v-text-field
          label="Name"
          solo
          v-model="desc"
          @keydown.enter="add"
        ></v-text-field>
      </v-flex>
      <v-flex xs4 sm3 md2>
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
<style scoped>
  .list{
    height: 100px;
    width: 180px;
    border: solid;
    border-width: 0.5px;
    overflow-y: auto;
  }
</style>
