<template>
  <div class="message" v-if="message">
    <div class="m-header">
      <div class="icon">{{message.sender.iconUrl}}</div>
      <div class="sender-name">{{message.sender.nickname}}</div>
      <div class="sent-at">{{message.sentAt | datetimeFormat}}</div>
      <div class="read" @click="readIt"></div>
      <div class="read-count"></div>
    </div>
    <div class="m-content-wrap">
      <div class="message-content">
        <div class="message-text">{{message.text}}</div>
        <div class="files" v-if="message.files.length">
          <file v-for="f in message.files" :key="f.id"/>
        </div>
      </div>
      <message v-for="m in message.children" :key="m.id"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex'
import Message from '../ts/models/message'
import File from './file.vue'
import messageConverter from '../ts/models/message'
import notify from '../ts/notify'
let ev :any
export default Vue.extend({
  data(){
    return {
      message:null as any
    }
  },
  props:{
    messageRef:Object
  },
  computed:{
    ...mapState(['userInfo'])
  },
  async created(){
    this.message = await messageConverter(this.messageRef.data())
    if(this.message.sender.email === this.userInfo.id){
      return
    }
    clearTimeout(ev)
    ev = setTimeout(()=>{
      this.$store.dispatch('notify', (this.message as  any).sender.nickname + '\n' + (this.message as any).text.substr(0, 20))
    }, 300)
  },
  methods:{
    readIt(){
      this.$store.dispatch('readIt', this.message)
    }
  }
})
</script>
<style lang="stylus">
.message
  padding 3px
  background-color rgb(233,233,222)
  margin-bottom 2px
  border-radius:2px
  .m-header
    background-color rgb(255, 233,255)
    display flex
    .icon
      flex-basis 32px
    .sender-name
      flex-basis 120px
    .sent-at
      font-size 0.7rem
      color gray
      flex-basis 150px
  .message-content
    background-color white
    border-radius 2px
    padding 3px
    .message-text
      white-space pre
      word-wrap break-word
</style>


