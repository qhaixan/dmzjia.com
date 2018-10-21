<template>
  <div class="container-inner"
    v-touch="{
      up: () => loadnew(),
    }">
    <div class="com" v-for="(c,key) in comments">
      <div class="portrait">
        <img :src="c.avatar" class="avatar">

      </div>
      <div class="msg">
        <div class="name">{{c.name}}</div>
        <div :class="'speech-bubble '+self(c.uid)">
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
  data(){
    return{
      comments:[],
      lastKey:null,
      loadSize:5,
      olderComments:[]
    }
  },
  props:{
    vkey: String
  },
  mounted(){
    this.load()
    //alert(JSON.stringify(this.comments))
  },
  methods:{
    self(uid){
      if(uid==this.$store.state.session.uid){
        return 'self'
      }
      return ''
    },
    loadnew(){
      this.load()
    },
    load() {

      var self = this

      commentsRef.child(this.vkey).limitToLast(this.loadSize+this.comments.length).on('value',function(snapshot) {
        self.comments = []
        var oldest = null
        snapshot.forEach(function(childSnapshot) {
          if(!oldest){
            oldest = childSnapshot.key
            self.lastKey = childSnapshot.key
          }
          self.getName(childSnapshot.val(),'first')
        })
        self.comments.reverse()
      })
      //
    },
    getName(comment,batch){
      var self = this

      usersRef.child(comment.person).once('value',function(snapshot) {
        var name = null
        if(snapshot.val().name){
          name = snapshot.val().name
        }else{
          name = snapshot.val().id
        }
        var avatar = null
        if(snapshot.val().avatar){
          avatar = snapshot.val().avatar
        }else{
          avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxC8tK9WH3CbaNFjiCcOkdiJlCyTL9IObOMJN63ECX_R-DmN8Jhw'
        }


        if(batch=='first'){
          self.comments.push({
            avatar : avatar,
            uid: comment.person,
            content :comment.content,
            time :comment.time,
            name :name
          })
        }else{
          self.olderComments.push({
            avatar : avatar,
            uid: comment.person,
            content :comment.content,
            time :comment.time,
            name :name
          })
        }

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
}
.portrait{
  padding-top: 1em;
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
  font-size: 9px;
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
@media only screen and (min-width: 425px) {
  .time{
    font-size: 12px;
  }
  .portrait{
    width:80px;
  }
  .avatar{
    height:80px;
  }
  .msg{
    max-width: calc( 100% - 80px );
  }
}
</style>
