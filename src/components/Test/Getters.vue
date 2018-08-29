<template id="">
  <div class="">
    <h3>Getters + component passing</h3>
    &lt;getters id={{id}}/&gt; //change in @/view/Test.vue<br>
    {{name}}
  </div>
</template>
<script>
  export default{
    data() {
      return {
        name: 'ID not found'
      }
    },
    props: {
      id: Number
    },
    mounted () {
      var id = parseInt(this.id)
      this.name = "Name: "+this.$store.getters.getById(id).name
    }
  }
</script>
