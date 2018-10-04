<template>
  <div class="container-inner" v-chat-scroll>
    <div class="com" v-for="(c,key) in comments">
      <div class="portrait">
        <img :src="c.avatar" class="avatar">

      </div>
      <div class="msg">
        <div class="name">{{c.name}}</div>
        <div class="speech-bubble">
          {{c.content}}
        </div>
        <div class="time">{{c.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { commentsRef } from '@/firebaseConfig'
import { usersRef } from '@/firebaseConfig'
export default {
  firebase:{
    comm : commentsRef
  },
  data(){
    return{
      comments:[],
    }
  },
  props:{
    vkey: String
  },
  mounted(){

    var self = this
    commentsRef.child(this.vkey).on('value',function(snapshot) {

      self.comments = []
      snapshot.forEach(function(childSnapshot) {
        self.getName(childSnapshot.val())
      })
    })
  },
  methods:{
    getName(comment){
      var self = this
      usersRef.child(comment.person).once('value',function(snapshot) {
        var name = null
        var avatar = null
        if(snapshot.val().name){
          name = snapshot.val().name
        }else{
          name = snapshot.val().id
        }
        if(snapshot.val().avatar){
          avatar = snapshot.val().avatar
        }else{
          avatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png'
        }
        self.comments.push({
          avatar : avatar,
          content :comment.content,
          time :comment.time,
          name :name
        })
      })

    }
  }
}
</script>

<style scoped>
.container-inner{
  position:relative;
}
.com{
  display: flex;
  margin-bottom: 5px;
}
.portrait{
  width: 15vw;
  height: 100%;
  display: flex; flex-direction: column;
}
.avatar{
  bottom: 0;
  border-radius: 50%;
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
.msg{
  max-width: 85vw;
  word-wrap: break-word;
  padding: 1em;
}
.name{
  white-space: nowrap;
  width: 0;
}
.time{
  white-space: nowrap;
  width: 0;
  color: grey;
  font-size: 7px;
}
.speech-bubble {
	position: relative;
	background: #353535;
	border-radius: .4em;
  padding: 8px 12px;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	left: 0.1em;
	top: 1.3em;
	width: 0;
	height: 0;
	border: 1em solid transparent;
	border-right-color: #353535;
	border-left: 0;
  border-top: 0;
	margin-top: -0.5em;
	margin-left: -1em;
}
</style>
