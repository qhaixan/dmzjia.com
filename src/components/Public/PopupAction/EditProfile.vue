<template lang="html">
  <div class="pop">
    <h2>{{action.title}}</h2>
    <br>
    <v-text-field
            box
            :label="action.label"
            v-model="value"
            :rules="[nameRules.required,nameRules.nospace]"
            required
            autofocus
          ></v-text-field>
    <div style="text-align:right;">
      <v-btn small fab @click="clear"><v-icon>delete</v-icon></v-btn>
      <v-btn @click="cancel">取消</v-btn>
      <v-btn color="#219100" @click="submit">提交</v-btn>
    </div>
  </div>
</template>

<script>
import { usersRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      action: {},
      value:'',
      nameRules: {
        required: value => !!value || '不可放空',
        nospace: value => !/ /.test(value) || '不可含有空格',
      },
    }
  },
  mounted(){
    this.action = this.$store.state.public.overlay.action
    this.value = this.$store.state.public.overlay.action.value
  },
  methods:{
    clear(){
      this.value = ''
    },
    cancel(){
      this.$store.commit('public_dialogPop',false)
    },
    submit(){
      if(this.value.length > 0 && !/ /.test(this.value)){
        usersRef.child(this.uid).child(this.action.child).set(this.value)
        this.$store.commit('public_dialogPop',false)
      }
    }
  },
  computed:{
    uid(){
      return this.$store.state.session.uid
    },
  }
}
</script>

<style lang="css">
.pop{
  text-align:center;
  padding:20px;
}
</style>
