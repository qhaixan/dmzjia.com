<template>
  <div style="width:100%">
    <v-alert
        class="alert"
        :value="sending"
        color="warning"
      >
      <span style="color:#d10000;">发送中。。。</span>
    </v-alert>
    <v-text-field
        v-if="active"
        :disabled="sending"
        :placeholder="placeholder()"
        v-model="sending? empty:content"
        :color="$store.state.common.secondaryColor"
        @blur="offText"
        @keydown.native.shift.enter="nextLine"
        @keydown.native.enter="time"
        autofocus
        solo>
      <v-btn :disabled="!auth || !content" slot="append" @click="time" outline small fab :color="$store.state.common.secondaryColor">
        <v-icon>send</v-icon>
      </v-btn>
    </v-text-field>

    <v-btn
      fab
      fixed
      small
      right
      bottom
      class="c"
      :color="$store.state.common.secondaryColor"
      @click="active=!active"
      v-else>
      <v-icon color="black">insert_comment</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { commentsRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      active:false,
      content:null,
      sending:false,
      empty:null
    }
  },
  props: {
    vkey: String
  },
  methods:{
    nextLine(){

    },
    offText(){
      if(this.isMobile){
        this.active=false
      }
    },
    time(){
      this.sending = true
      var self = this
      this.$axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=swkACzAp3h79H6lCIZI67Z5JN668i42g0QKwmtisDTPcMVGuji3XSkAZ3dhT9-TCnDvip4msaNS8GTgpaHloIRcOLX-uCQu4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-xcVIW3tKXBXhhM72BGFhdwi8IO-S-mJz&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk")
        .then(response => {
          var time = response.data.hours+':'+("0" + response.data.minutes).slice(-2)+'  '
                            +response.data.day+'/'+response.data.month+'/'+response.data.year
          self.send(time)
        })
    },
    send(time){
      var self = this

      commentsRef.child(this.vkey).push({
        person: self.uid,
        content: self.content,
        time: time
      })
      this.content= null
      this.sending= false
      if(this.isMobile)
        this.active = false
    },
    placeholder(){
      if(!this.sending){
        if(this.uid){
          return '说点什么吧'
        }
        return '登入后才可以留言哦'
      }
      return '发送中。。。'
    },
    dateTime(){
      var d = new Date();
      var date =  d.getHours().toString()+':'+
                  ("0" + d.getMinutes()).slice(-2)+'  '+
                  ("0" + d.getDate()).slice(-2)+'/'+
                  ("0" + Number(d.getMonth()+1)).slice(-2)+'/'+
                  d.getFullYear().toString()
      return date
    }
  },
  mounted(){
    if(!this.isMobile){
      this.active=true
    }
  },
  computed:{
    uid(){
      return this.$store.state.session.uid
    },
    auth(){
      if(this.uid){
        return true
      }
      return false
    },
    isMobile(){
      return this.$store.state.isMobile
    },
  }
}
</script>

<style scoped>
.alert{
  margin-bottom: 30px;
}
.c{
  bottom: 70px;
}
@media only screen and (min-width: 1024px) {
  .alert{
    margin-bottom: 1px;
  }
}
</style>
