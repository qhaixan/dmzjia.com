<template id="">
  <div class="">
    <mutations/><hr>
    <getters id="2" /><hr>
    <add/><hr>
  </div>
</template>
<script>
import mutations from '@/components/Test/Mutations'
import getters from '@/components/Test/Getters'
import add from '@/components/Test/AddProduct'
  export default{
    components: {
      mutations,
      getters,
      add
    }
  }
</script>
