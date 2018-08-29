<template id="">
  <div class="">
    <h1>Test</h1>
    <mutations/>
    <getters id="5"/>
    <register/>
  </div>
</template>
<script>
import mutations from '@/components/Test/Mutations'
import getters from '@/components/Test/Getters'
import register from '@/components/Test/CreateUser'
  export default{
    components: {
      mutations,
      getters,
      register
    }
  }
</script>
