import Vue from 'vue'
import Vuex from 'vuex'
import * as packageData from '../../package.json'
Vue.use(Vuex)
const version = packageData.version
const store = new Vuex.Store({
  state:{
    version,
    userInfo:{},
    teams:[{
      name:'helo'
    }],
    messages:[]
  }
})
export default store