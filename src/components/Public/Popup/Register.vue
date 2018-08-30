<template lang="html">
<div class="">
  <div class="" style="text-align:center;padding:20px;">
    <h2>Registration</h2>
  </div>
  <div style="padding:30px;">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
            v-if="exist"
            v-on:change="change"
            v-model="name"
            :rules="[nameRules.exist]"
            :counter="nameLimit"
            label="Username"
            required>
      </v-text-field>
      <v-text-field
            v-else
            v-model="name"
            :rules="[nameRules.required, nameRules.min, nameRules.max]"
            :counter="nameLimit"
            label="Username"
            required>
      </v-text-field>
      <v-text-field
            v-model="password"
            :append-icon="showPw ? 'visibility_off' : 'visibility'"
            :rules="[pwRules.required, pwRules.min]"
            :type="showPw ? 'text' : 'password'"
            label="Password"
            @click:append="showPw = !showPw"
            required>
      </v-text-field>

      <div class="" style="text-align:right;">
        <span class="clear" @click="clear">clear</span>
        <v-btn :disabled="!valid" @click="submit" :loading="isLoading">
          submit
        </v-btn>
      </div>


    </v-form>
  </div>
  <div class="" style="text-align:center;padding:10px;">
    <span class="toLogin" @click="toLogin">Have an account? Log in here</span>
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
    valid: true,
    name: '',
    nameLimit: 36,
    nameRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 5 || 'Min 5 characters',
      max: v => v.length <= 36 || 'Max 36 characters',
      exist: v => v.length <= 0 ||'This username has been taken'
    },
    password: '',
    showPw: false,
    pwLimit: 5,
    pwRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 5 || 'Min 5 characters',
    },
    isLoading: false
  }),

  methods: {
    submit() {
      this.isLoading = true
      if (this.$refs.form.validate()) {
        var exist = false;
        usersRef.orderByChild('id').equalTo(this.name).once('value', function (snapshot) {
          exist=true;
        });
        if(!exist){
          usersRef.push({ id: this.name, pw: this.password, role:1 })
          .then((snap)=>{
            this.login(snap.key)
          })
        }else{
            this.exist=exist
        }
      }
      this.isLoading = false
    },
    login(key) {
      this.$store.state.session.uid = key
      this.$store.commit('public_dialogContent',{content:'register_success',width:'250'})
      var self = this
      setTimeout(function () {
        self.$store.commit('public_dialogPop')
      }, 2000)

    },
    clear() {
      this.$refs.form.reset()
    },
    change() {
      this.exist = false
    },
    toLogin(){
      this.$store.commit('public_dialogContent',{content:'login',width:'350'})
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
.toLogin:hover {
  cursor: pointer;
}
</style>
