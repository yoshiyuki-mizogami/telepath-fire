<template>
  <div class="layer" v-show="show">
    <div class="dialog">
      <div class="dialog-message">{{message}}</div>
      <div class="dialog-btns">
        <button class="dialog-ok" @click="onOK">OK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import eventHub from '../ts/eventHub'
import { clearTimeout } from 'timers'
export enum MESSAGE_LEVEL{
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}
export default Vue.extend({
  data(){
    return {
      show:false,
      message:'',
      level:MESSAGE_LEVEL.INFO,
      ev: null as any,
      clbk:null as Function | null
    }
  },
  created(){
    eventHub.$on('showDialog', this.showDialog)
  },
  methods:{
    showDialog(message:string, level = MESSAGE_LEVEL.INFO, clbk : Function | null){
      clearTimeout(this.ev)
      this.message = message
      this.level = level
      this.clbk = clbk
      this.show = true
    },
    async onOK(){
      this.clbk ? this.clbk() : ''
      this.hideMe()
    },
    hideMe(){
      this.show = false
    }
  }
})
</script>
<style lang="stylus">
.layer
  position fixed
  top 0
  left 0
  height 100%
  width 100%
  background-color rgba(30,30,30,.5)

.dialog
  padding 15px
  width 80vw
  margin 5% auto 0 auto
  background-color white
  text-align center
  font-size 1.4rem
  box-shadow 0px 5px 5px 0 rgb(100,100,100)
  .dialog-message
    min-height 10vh
</style>

