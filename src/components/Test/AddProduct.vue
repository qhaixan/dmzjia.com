<template id="">
  <div class="">
    <h3>Add Product (Firebase)</h3>
    <div class="list">
      <ul>
        <li v-for="p in products">{{p.desc}}</li>
      </ul>
    </div>
    count: {{productCount()}}<br>
    description: <input type="text" v-model="desc" @keydown.enter="add"><br>
    <button @click="add">Add</button>
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
