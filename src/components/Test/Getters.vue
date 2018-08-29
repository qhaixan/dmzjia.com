<template id="">
  <div class="">
    <h3>Getters + component param</h3>
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
