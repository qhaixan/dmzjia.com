<template lang="html">
<div class="">
  <div class="" style="text-align:center;padding:20px;">
    <h2>用户注册</h2>
  </div>
  <div style="padding:30px;">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
            v-if="existMail"
            @keydown.native="changeMail"
            v-model="email"
            :rules="[mailRules.exist]"
            label="电邮"
            placeholder="[稍后需认证]"
            required>
      </v-text-field>
      <v-text-field
            v-else
            v-model="email"
            :rules="[mailRules.required, mailRules.valid]"
            label="电邮"
            placeholder="[稍后需认证]"
            required>
      </v-text-field>

      <v-text-field
            v-if="exist"
            @keydown.native="change"
            v-model="name"
            :rules="[nameRules.exist]"
            :counter="nameLimit"
            label="用户名"
            placeholder="[日后用于登入]"
            required>
      </v-text-field>
      <v-text-field
            v-else
            v-model="name"
            :rules="[nameRules.required, nameRules.missformat, nameRules.min, nameRules.max]"
            :counter="nameLimit"
            label="用户名"
            placeholder="[日后用于登入]"
            required>
      </v-text-field>

      <v-text-field
            v-model="password"
            :append-icon="showPw ? 'visibility_off' : 'visibility'"
            :rules="[pwRules.required, pwRules.min]"
            :type="showPw ? 'text' : 'password'"
            label="密码"
            @click:append="showPw = !showPw"
            required>
      </v-text-field>

      <v-text-field
            v-if="password!=password2"
            v-model="password2"
            :append-icon="showPw2 ? 'visibility_off' : 'visibility'"
            :rules="[pwRules.match]"
            :type="showPw2 ? 'text' : 'password'"
            label="确认密码"
            @click:append="showPw2 = !showPw2"
            required>
      </v-text-field>
      <v-text-field
            v-else
            v-model="password2"
            :append-icon="showPw2 ? 'visibility_off' : 'visibility'"
            :type="showPw2 ? 'text' : 'password'"
            label="确认密码"
            @click:append="showPw2 = !showPw2"
            required>
      </v-text-field>

      <div class="" style="text-align:right;">
        <span class="clear" @click="clear">清空</span>
        <v-btn :disabled="!valid||cooldown!='false'" @click="submit" :loading="isLoading" color="info">
          提交
        </v-btn>
      </div>
      <span class="warnLimit" v-if="cooldown=='true'">此网络已注册太多次，请明天再试。</span>


    </v-form>
  </div>
  <div class="" style="text-align:center;padding:10px;">
    <span class="toLogin" @click="toLogin">已经注册了？前往登入</span>
  </div>


</div>
</template>

<script>
import { usersRef } from '@/firebaseConfig'
import { ipRef } from '@/firebaseConfig'
export default {
  firebase: {
    users: usersRef
  },
  data: () => ({
    exist: false,
    existMail: false,
    valid: true,
    name: '',
    nameLimit: 36,
    nameRules: {
      required: value => !!value || '不可放空',
      min: v => v.length >= 5 || '不可小于5字母',
      max: v => v.length <= 36 || '不可大于36字母',
      exist: v => v.length <= 0 ||'此用户名已被取用',
      missformat: v=> /^[a-zA-Z0-9_]*$/.test(v)|| '只允许英文字母及数字，不含空格'
    },
    email:'',
    mailRules: {
      required: value => !!value || '不可放空',
      exist: v => v.length <= 0 ||'此电邮已被取用',
      valid: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || '电邮格式不正确'
    },
    password: '',
    showPw: false,
    pwLimit: 5,
    password2: '',
    showPw2: false,
    pwRules: {
      required: value => !!value || '不可放空.',
      min: v => v.length >= 5 || '不可小于5字母',
      match: v => v.length < 0 || '确认密码不相称',
    },
    isLoading: false,
    cooldown:'checking'
  }),
  methods: {
    submit() {
      this.isLoading = true
      var self = this
      if (this.$refs.form.validate()) {
        var exist = '';
        usersRef.orderByChild('email').equalTo(this.email).once('value', function (snapshot) {
          if(snapshot.val()!=null)
            exist='email';
        });
        if(exist=='')
        usersRef.orderByChild('id').equalTo(this.name).once('value', function (snapshot) {
          if(snapshot.val()!=null)
            exist='username';
        });

        var pwMatch = (this.password==this.password2)
        if(exist=='' && pwMatch){
          var md5 = require('js-md5')
          var pw = md5(this.password)
          var link = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
          link = md5(link)
          usersRef.push({ id: this.name, pw: pw, verificationLink:link, role:0, email:this.email })
          .then((snap)=>{
            //self.verify(snap.key)
            self.verify(link)
          })
        }else if(exist!=''){
          if(exist=='email'){
            this.existMail=true
          }else{
            this.exist=true
          }
          this.isLoading = false
        }else{

        }

      }

    },
    login(key) {//not using
      this.$store.state.session.uid = key
      this.$store.state.session.name = this.name
      this.$store.state.session.role = 1
      this.$store.commit('public_dialogContent',{content:'register_success',width:'250'})
      var self = this
      setTimeout(function () {
        self.$store.commit('public_dialogPop',false)
      }, 2000)
    },
    clear() {
      this.$refs.form.reset()
    },
    change() {
      this.exist = false
    },
    changeMail() {
      this.existMail = false
    },
    toLogin(){
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
    },
    verify(ln){
      this.date('record')
      var self = this
      var service_id = "dmzjia_noreply"
      var template_id = "template_uJaoKiCR"
      var link = "m.dmzjia.com/verify/"+ln
      var params = {
        "to_email":this.email,
        "to_name":this.name,
        "link":"<a href="+link+">"+link+"</a>"
      }

      window.emailjs.send(service_id,template_id,params)
    	.then(function(){
          self.$store.commit('public_dialogContent',{content:'register_verify',width:'250'})
          this.isLoading = false
         //alert("Sent!");
       }, function(err) {
         //console.log("Send email failed!\r\n Response:\n " + JSON.stringify(err));
         this.isLoading = false
      })
    },
    checkIP(date,time){
      var ip = this.$store.state.public.geo.geoplugin_request
      var self = this
      //ipRef.child(date).child('register').child(time).set(ip)
      ipRef.child(date).child("register").once("value")
        .then(function(snapshot) {
          if(snapshot.numChildren()<3){
            self.cooldown = 'false'
          }else{
            self.cooldown = 'true'
          }
        });
    },
    recordIP(date,time){
      var ip = this.$store.state.public.geo.geoplugin_request
      ipRef.child(date).child('register').child(time).set(ip)
    },
    date(s){
      var self = this
      this.$axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=swkACzAp3h79H6lCIZI67Z5JN668i42g0QKwmtisDTPcMVGuji3XSkAZ3dhT9-TCnDvip4msaNS8GTgpaHloIRcOLX-uCQu4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-xcVIW3tKXBXhhM72BGFhdwi8IO-S-mJz&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk")
        .then(response => {
          var date = response.data.year+'-'+("0" + response.data.month).slice(-2)+'-'+("0" + response.data.day).slice(-2)
          var time = ("0" + response.data.hours).slice(-2)+':'+("0" + response.data.minutes).slice(-2)+':'+("0" + response.data.seconds).slice(-2)+':'+("0" + response.data.millis).slice(-3)
          if(s=='check'){
            self.checkIP(date,time)
          }else{
            self.recordIP(date,time)
          }
        })
    },
  },
  mounted(){
    this.date('check')
  }
}
</script>

<style scoped>
.clear{
  font-weight: 600;
  margin: 10px;
}
.clear:hover {
  cursor: pointer;
}
.toLogin:hover {
  cursor: pointer;
}
.warnLimit {
  float:right;
  font-size: 80%;
  color:red;
}
</style>
