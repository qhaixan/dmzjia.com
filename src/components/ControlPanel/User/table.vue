<template lang="html">
  <v-data-table
    :headers="headers"
    :items="users"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs">{{ props.item.role }}</td>
    </template>
  </v-data-table>
</template>

<script>
  import { usersRef } from '@/firebaseConfig'
  export default {
    firebase: {
      users: usersRef
    },
    data () {
      return {
        headers: [
          {
            text: 'Username',
            align: 'left',
            sortable: true,
            value: 'id'
          },
          { text: 'Role', value: 'role' }
        ],
        users:[],
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
        ]
      }
    },
    mounted(){
      var self = this
      usersRef.on('value', function (snapshot) {
        self.loadUsers(snapshot.val())
      });
    },
    methods:{
      loadUsers(users){
        var size = Object.keys(users).length
        var keys = Object.values(users)

        //cconsole.log(users['-LLDV2D6IulJg8Xxy30J'])

        this.users = []
        for(var i=0;i < size;i++){
          var r = this.roleTitle(keys[i].role)
          this.users.push({
            id: keys[i].id,
            role: r,
          })
        }
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
