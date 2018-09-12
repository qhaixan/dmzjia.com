<template id="">
  <div class="">
    <mutations style="background:#ed6a75"/>
    <getters id="2" style="background:#6a8fed"/>
    <add style="background:#bfed6a"/>
    is mobile: {{$store.state.isMobile}}
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
