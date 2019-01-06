import Vue from 'vue'
import Root from '../vue/root.vue'
import Message from '../vue/message.vue'
import store from './store'
Vue.component('Message', Message)
new Vue({
  el:'#app',
  store,
  render(cl){
    return cl(Root)
  }
})