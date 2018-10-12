<template>
  <div class="pop">
    <v-text-field
            box
            label="标题"
            placeholder="第1集"
            :rules="[nameRules.required]"
            required
            v-model="index"
            autofocus
          ></v-text-field>
    <v-select
            box
            label="来源"
            :items="sources"
            v-model="source"
          ></v-select>
    <v-text-field
            box
            label="链接"
            placeholder="0B9BDswIn..."
            :rules="[nameRules.required]"
            required
            v-model="url"
          ></v-text-field>
    <div class="btns">
      <v-btn flat small @dblclick="remove" style="float:left;" v-if="episodeKey.length>0">
        <v-icon color="red">delete_forever</v-icon>删除这集(双击)
      </v-btn>
      <v-btn @click="cancel">取消</v-btn>
      <v-btn color="#219100" @click="submit">提交</v-btn>
    </div>
  </div>
</template>

<script>
import { animeRef } from '@/firebaseConfig'
import { hiddenAniRef } from '@/firebaseConfig'
export default {
  data(){
    return{
      nameRules: {
        required: value => !!value || '不可放空',
      },
      index:'',
      source:'GoogleDrive',
      url:'',
      episodeKey:'',
      sources:[
        'Openload',
        'GoogleDrive',
        'YouTube',
        'Youku',
      ]
    }
  },
  mounted(){
    if(this.action.episode){
      this.index = this.action.episode.index
      this.source = this.action.episode.source
      this.url = this.action.episode.url
      this.episodeKey = this.action.episode.key
    }
  },
  methods:{
    cancel(){
      this.$store.commit('public_dialogPop',false)
    },
    remove(){
      if(this.action.published){
        animeRef.child(this.key).child('episode').child(this.episodeKey).remove()
      }else{
        hiddenAniRef.child(this.key).child('episode').child(this.episodeKey).remove()
      }
      this.$store.commit('public_dialogPop',false)
    },
    submit(){
      var self = this
      if(this.index.toString().length>0&&this.url.length>0&&this.sources.includes(this.source)){
        if(this.action.published){
          if(this.episodeKey.length>0){
            animeRef.child(this.key).child('episode').child(this.episodeKey).child('index').set(this.index)
            animeRef.child(this.key).child('episode').child(this.episodeKey).child('source').set(this.source)
            animeRef.child(this.key).child('episode').child(this.episodeKey).child('url').set(this.url)
          }else{
            animeRef.child(this.key).child('episode').push({
              index:self.index,
              source:self.source,
              url:self.url,
            })
          }
        }else{
          if(this.episodeKey.length>0){
            hiddenAniRef.child(this.key).child('episode').child(this.episodeKey).child('index').set(this.index)
            hiddenAniRef.child(this.key).child('episode').child(this.episodeKey).child('source').set(this.source)
            hiddenAniRef.child(this.key).child('episode').child(this.episodeKey).child('url').set(this.url)
          }else{
            hiddenAniRef.child(this.key).child('episode').push({
              index:self.index,
              source:self.source,
              url:self.url,
            })
          }
        }
        this.$store.commit('public_dialogPop',false)
      }

    }
  },
  computed:{
    action(){
      return this.$store.state.public.overlay.action
    },
    key(){
      return this.$store.state.action.key
    }
  },
}
</script>

<style scoped>
.pop{
  text-align:center;
  padding:20px;
}
.btns{
  text-align: right;
}
</style>
