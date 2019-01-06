<template>
  <div class="message">
    <div class="m-header">
      <div class="icon">{{message.sender.iconUrl}}</div>
      <div class="sender-name">{{message.sender.nickname}}</div>
      <div class="sent-at">{{message.sentAt | datetimeFormat}}</div>
      <div class="read">Read</div>
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
import Message from '../ts/models/message'
import File from './file.vue'
export default Vue.extend({
  props:{
    message:Object
  },
  methods:{

  }
})
</script>
<style lang="stylus">

</style>


