import Vue from 'vue'
import './filters.ts'
import Root from '../vue/root.vue'
import Message from '../vue/message.vue'
import Dialog from '../vue/dialog.vue'
import store from './store'

Vue.component('Message', Message)
Vue.component('AppDialog', Dialog)
new Vue({
  el:'#app',
  store,
  render(cl){
    return cl(Root)
  }
})