<template>
  <div class="message-form">
    <textarea placeholder="Ctrl+Enter to send message" class="message-input" v-model="message" @keydown.ctrl.enter.prevent="send"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapActions} from 'vuex'
export default Vue.extend({
  data(){
    return {
      message:''
    }
  },
  methods:{
    send(){
      this.$store.dispatch('sendMessage', this.message)
      this.message = ''
    }
  }
})
</script>
<style lang="stylus">
.message-input
  height 100%
  border-radius 3px
  resize none
  width 70%
  border solid 1px gray

</style>

