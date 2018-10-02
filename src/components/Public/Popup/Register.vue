<template lang="html">
<div class="">
  <div class="" style="text-align:center;padding:20px;">
    <h2>Registration</h2>
  </div>
  <div style="padding:30px;">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
            v-if="existMail"
            @keydown.native="changeMail"
            v-model="email"
            :rules="[mailRules.exist]"
            label="电邮"
            required>
      </v-text-field>
      <v-text-field
            v-else
            v-model="email"
            :rules="[mailRules.required, mailRules.valid]"
            label="电邮"
            required>
      </v-text-field>

      <v-text-field
            v-if="exist"
            @keydown.native="change"
            v-model="name"
            :rules="[nameRules.exist]"
            :counter="nameLimit"
            label="用户名"
            required>
      </v-text-field>
      <v-text-field
            v-else
            v-model="name"
            :rules="[nameRules.required, nameRules.min, nameRules.max]"
            :counter="nameLimit"
            label="用户名"
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
        <v-btn :disabled="!valid" @click="submit" :loading="isLoading" color="info">
          提交
        </v-btn>
      </div>


    </v-form>
  </div>
  <div class="" style="text-align:center;padding:10px;">
    <span class="toLogin" @click="toLogin">已经注册了？前往登入</span>
  </div>


</div>
</template>

<script>
import { usersRef } from '@/firebaseConfig'
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
      exist: v => v.length <= 0 ||'此用户名已被取用'
    },
    email:'',
    mailRules: {
      required: value => !!value || '不可放空',
      exist: v => v.length <= 0 ||'此电邮已被取用',
      valid: v => /.+@.+/.test(v) || '电邮格式不正确'
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
    isLoading: false
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
      var self = this
      var service_id = "dmzjia_noreply"
      var template_id = "template_uJaoKiCR"
      var link = "m.dmzjia.com/verify/"+ln
      var params = {
        "to_email":"999kaitokid@gmail.com",
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
</style>
