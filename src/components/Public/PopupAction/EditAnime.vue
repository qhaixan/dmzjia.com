<template>
  <div class="pop">
    <h2>{{action.title}}</h2>
    <br>
    <v-text-field
            solo
            :placeholder="action.placeholder"
            :rules="[nameRules.required]"
            required
            v-model="input"
            autofocus
          ></v-text-field>
    <div class="btns">
      <v-btn @click="cancel">取消</v-btn>
      <v-btn color="#219100" @click="submit">提交</v-btn>
    </div>
    {{action}}
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
import { hiddenAniRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      nameRules: {
        required: value => !!value || '不可放空',
      },
      input:''
    }
  },
  mounted(){
    this.input = this.action.value
  },
  methods:{
    cancel(){
      this.$store.commit('public_dialogPop',false)
    },
    submit(){
      if(this.input.length>0){
        if(this.action.published){
          animeRef.child(this.key).child(this.action.child).set(this.input)
        }else{
          hiddenAniRef.child(this.key).child(this.action.child).set(this.input)
        }
        this.$store.commit('public_dialogPop',false)
      }

    }
  },
  computed:{
    action(){
      return this.$store.state.public.overlay.action
    },
    key(){
      return this.$store.state.action.key
    }
  },
}
</script>

<style scoped>
.pop{
  text-align:center;
  padding:20px;
}
.btns{
  text-align: right;
}
</style>
