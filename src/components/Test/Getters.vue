<template id="">
  <div class="">
    <h2>Getters + component param</h2>
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
      id: String
    },
    mounted () {
      var id = parseInt(this.id)
      this.name = "Name: "+this.$store.getters.getById(id).name
    }
  }
</script>
