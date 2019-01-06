import Vue from 'vue'
import moment from 'moment'
Vue.filter('datetimeFormat', (v:Date | null)=>{
  if(!v){
    return ''
  }
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})