<template lang="html">
<div class="">
  <div class="" style="text-align:center;padding:20px;">
    <h2>Login</h2>
  </div>
  <div style="padding:30px;">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
            v-if="exist&&!error"
            v-model="name"
            :rules="[nameRules.required]"
            label="用户名"
            required>
      </v-text-field>
      <v-text-field
            v-else-if="!exist"
            @keydown.native="changeName"
            v-model="name"
            :rules="[nameRules.notFound]"
            label="用户名"
            required>
      </v-text-field>
      <v-text-field
            v-else-if="error"
            @keydown.native="changeName"
            v-model="name"
            :rules="[nameRules.error]"
            label="用户名"
            required>
      </v-text-field>

      <v-text-field
            v-if="match"
            v-model="password"
            @keyup.enter.native="submit"
            :append-icon="showPw ? 'visibility_off' : 'visibility'"
            :rules="[pwRules.required]"
            :type="showPw ? 'text' : 'password'"
            label="密码"
            @click:append="showPw = !showPw"
            required>
      </v-text-field>
      <v-text-field
            v-else
            @keydown.native="changePw"
            v-model="password"
            :append-icon="showPw ? 'visibility_off' : 'visibility'"
            :rules="[pwRules.unmatch]"
            :type="showPw ? 'text' : 'password'"
            label="密码"
            @click:append="showPw = !showPw"
            required>
      </v-text-field>


      <div class="" style="text-align:right;">
        <v-btn flat @click="clear">清空</v-btn>
        <v-btn :disabled="!valid" @click="submit" :loading="isLoading" color="success">
          提交
        </v-btn>
      </div>


    </v-form>
  </div>
  <div class="" style="text-align:center;padding:10px;">
    <span class="toReg" @click="toReg">新用户？前往注册</span>
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
    exist: true,
    error:false,
    match: true,
    valid: true,
    name: '',
    nameRules: {
      required: value => !!value || '不可放空',
      notFound: v => v.length <= 0 ||'用户名不存在',
      error: v => v.length <= 0 ||'请前往邮箱进行认证',
    },
    password: '',
    showPw: false,
    pwRules: {
      required: value => !!value || '不可放空.',
      unmatch: v => v.length <= 0 ||'密码不对称'
    },
    isLoading: false
  }),

  methods: {
    getUser(key) {
      var k = {}
      usersRef.child(key).once('value', function (snapshot) {
        k = snapshot.val()
      });
      return k
    },
    submit() {
      this.isLoading = true
      if (this.$refs.form.validate()&&this.valid) {

        var key = null
        usersRef.orderByChild('id').equalTo(this.name).once('value', function (snapshot) {
          for(var k in snapshot.val())
            key = k
        });
        if(key==null){
          this.exist=false
          var n = this.name
          var self = this
          this.name = ''
          setTimeout(function () {
            self.name = n
          }, 10)
        }else{
          var user = this.getUser(key)
          var md5 = require('js-md5')
          var pw = md5(this.password)
          if(user.pw==pw){
            this.login(key,user)
          }else{
            this.match = false
            var p = this.password
            var self = this
            this.password = ''
            setTimeout(function () {
              self.password = p
            }, 10)

          }
        }
      }
      this.isLoading = false
    },
    login(key,user) {
      if(user.role<1){
        this.error=true
      }else{
        this.$store.state.session.uid = key
        this.$store.commit('public_dialogContent',{content:'register_success',width:'250'})
        var self = this
        setTimeout(function () {
          self.$store.commit('public_dialogPop',false)
        }, 1200)
      }
    },
    clear() {
      this.$refs.form.reset()
    },
    changeName() {
      this.exist = true
      this.error = false
    },
    changePw() {
      this.match = true
    },
    toReg(){
      this.$store.commit('public_dialogContent',{content:'register',width:'350'})
    },
  },
  mounted(){
    var uid = this.$localStorage.get('RNnryrIfpw',null,String)
    if(uid&&uid!="null") {
      this.$store.state.session.uid = uid
    }
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
.toReg:hover {
  cursor: pointer;
}
</style>
