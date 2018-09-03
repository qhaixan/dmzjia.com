<template lang="html">
<div class="">
  <div class="" style="text-align:center;padding:20px;">
    <h2>Login</h2>
  </div>
  <div style="padding:30px;">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
            v-if="exist"
            v-model="name"
            :rules="[nameRules.required]"
            label="Username"
            required>
      </v-text-field>
      <v-text-field
            v-else
            @keydown.native="changeName"
            v-model="name"
            :rules="[nameRules.notFound]"
            label="Username"
            required>
      </v-text-field>

      <v-text-field
            v-if="match"
            v-model="password"
            @keyup.enter.native="submit"
            :append-icon="showPw ? 'visibility_off' : 'visibility'"
            :rules="[pwRules.required]"
            :type="showPw ? 'text' : 'password'"
            label="Password"
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
            label="Password"
            @click:append="showPw = !showPw"
            required>
      </v-text-field>


      <div class="" style="text-align:right;">
        <span class="clear" @click="clear">clear</span>
        <v-btn :disabled="!valid" @click="submit" :loading="isLoading" color="success">
          submit
        </v-btn>
      </div>


    </v-form>
  </div>
  <div class="" style="text-align:center;padding:10px;">
    <span class="toReg" @click="toReg">New here? Register now</span>
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
    match: true,
    valid: true,
    name: '',
    nameRules: {
      required: value => !!value || 'Required.',
      notFound: v => v.length <= 0 ||'Username not found'
    },
    password: '',
    showPw: false,
    pwRules: {
      required: value => !!value || 'Required.',
      unmatch: v => v.length <= 0 ||'Password not matched'
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
      this.$store.state.session.uid = key
      this.$store.state.session.name = user.id
      this.$store.state.session.role = user.role
      this.$store.commit('public_dialogContent',{content:'register_success',width:'250'})
      var self = this
      setTimeout(function () {
        self.$store.commit('public_dialogPop',false)
      }, 2000)

    },
    clear() {
      this.$refs.form.reset()
    },
    changeName() {
      this.exist = true
    },
    changePw() {
      this.match = true
    },
    toReg(){
      this.$store.commit('public_dialogContent',{content:'register',width:'350'})
    },
    storeUser(uid){
      this.$store.commit('public_dialogContent',{content:'register_success',width:'250'})
      var self = this
      usersRef.child(uid).once('value').then(function(snapshot) {
        self.setRole(snapshot.val().role)
        self.setName(snapshot.val().id)
      });
      setTimeout(function () {
        self.$store.commit('public_dialogPop',false)
      }, 2000)
    },
    setRole(r){
      this.$store.state.session.role = r
    },
    setName(n){
      this.$store.state.session.name = n
    }
  },
  mounted(){
    if(this.$cookies.isKey("uid")) {
      var uid = this.$cookies.get('uid')
      this.$store.state.session.uid = uid
      this.storeUser(uid)
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
