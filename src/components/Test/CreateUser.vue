<template id="">
  <div class="">
    <h3>Create User (Firebase)</h3>
    user count: {{userCount()}}<br>
    username: <input name="" type="text" v-model="username"><br>
    password: <input name="" type="password" v-model="password"><br>
    <button @click="register">Register</button>
  </div>
</template>
<script>
  import { usersRef } from '@/firebase'
  export default{
    firebase: {
      users: usersRef
    },
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      register(){
        usersRef.push({ username: this.username, password: this.password })
        this.username = ''
        this.password = ''
      },
      userCount(){
        return this.users.length;
      }
    }
  }
</script>
