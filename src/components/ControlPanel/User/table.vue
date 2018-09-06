<template lang="html">
  <v-card>
    <v-card-title>
      Users List
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search by username"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>


    <v-data-table
      expand=true
      :headers="headers"
      :items="users"
      :search="search"
      :loading="!loaded"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="teal lighten-3" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs">{{ props.item.role }}</td>
        <td class="text-xs" style="font-weight:600;">
          <span v-if="props.item.status" style="color:green;">Online</span>
          <span v-else style="color:#bcbcbc;">Offline</span>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import { usersRef } from '@/firebaseConfig'
  import { currentRef } from '@/firebaseConfig'
  export default {
    firebase: {
      users: usersRef
    },
    data () {
      return {
        search: '',
        loaded: false,
        tempOnline: null,
        headers: [
          {
            text: 'Username',
            align: 'left',
            //sortable: true,
            value: 'id'
          },
          { text: 'Role', value: 'role' },
          { text: 'Status', value: 'status' }
        ],
        users:[]/*,
        desserts: [
          {
            value: false,
            id: 'Frozen Yogurt',
            role: 159
          },
          {
            value: false,
            id: 'Ice cream sandwich',
            role: 237
          }
        ]*/
      }
    },
    mounted(){
      var self = this
      usersRef.on('value', function (snapshot) {
        self.loadUsers(snapshot.val())
      });
    },
    methods:{
      filtered(name){
        return name.includes(this.filter)
      },
      loadUsers(users){
        var size = Object.keys(users).length
        var user = Object.values(users)
        var keys = []
        var i=0
        for(var k in users){
          keys[i] = k
          i+=1;
        }

        this.users = []
        for(var i=0;i < size;i++){
          var r = this.roleTitle(user[i].role)
          var s = this.getStatus(user[i].online)
          this.users.push({
            id: user[i].id,
            role: r,
            status: s
          })
        }
        this.loaded = true
      },
      getStatus(s){
        if(s){
          return true
        }
        return false
      },
      roleTitle(r){
        if(r==1){
          return 'user'
        }else if(r==2){
          return ''
        }else if(r==3){
          return 'admin'
        }
      }
    }
  }
</script>

<style lang="css">
</style>
