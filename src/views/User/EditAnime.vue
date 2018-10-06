<template>
  <div class="">
    <h2 @click="chgTitle()">{{anime.title}}<v-icon>edit</v-icon></h2>
    <table>
      <tr>
        <td><img v-if="anime.imgV" :src="anime.imgV"></td>
        <td><img v-if="anime.imgH" :src="anime.imgH"></td>
      </tr>
      <tr>
        <td><v-btn :color="btnclr(anime.imgV)" @click="chgImg('imgV',anime.imgV)">{{btntxt(anime.imgV)}}直图</v-btn></td>
        <td><v-btn :color="btnclr(anime.imgH)" @click="chgImg('imgH',anime.imgH)">{{btntxt(anime.imgH)}}横图</v-btn></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
import { hiddenAniRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      anime:{
        title:null,
        imgV:null,
        imgH:null
      },
      published:null
    }
  },
  mounted(){
    var self = this
    this.$nextTick(() => {

      if(!self.key){
        self.$router.push({name:'collection'})
      }else{
        animeRef.child(self.key).on('value',function(snap){
          self.published = true
          self.anime = snap.val()
        })
        if(!self.anime){
          hiddenAniRef.child(self.key).on('value',function(snap){
            self.published = false
            self.anime = snap.val()
          })
        }
      }
    });
  },
  methods:{
    chgTitle(){
      this.$store.commit('public_dialogAction',{  content:'edit_anime',
                                                  width:'350',
                                                  action:{
                                                    child:'title',
                                                    value:this.anime.title,
                                                    title:'更改标题',
                                                    placeholder:'输入新标题',
                                                    published:this.published
                                                  }
                                                })
    },
    chgImg(type,src){
      this.$store.commit('public_dialogAction',{  content:'edit_anime',
                                                  width:'350',
                                                  action:{
                                                    child:type,
                                                    value:src,
                                                    title:'更改图片',
                                                    placeholder:'输入图片连接',
                                                    published:this.published
                                                  }
                                                })
    },
    btnclr(s){
      if(s){
        return '#d18b00'
      }
      return '#219100'
    },
    btntxt(s){
      if(s){
        return '更改'
      }
      return '添加'
    }
  },
  computed:{
    key(){
      return this.$store.state.action.key
    }
  }
}
</script>

<style scoped>
img{
  max-width: 100%;
  max-height: 100%;
}
tr:first-child{
  width: 30vw;
}
tr:nth-child(2) {
  width: 70vw;
}
td{
  text-align: center;
}
</style>
