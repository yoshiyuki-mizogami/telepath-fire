import Vue from 'vue'
import Vuex from 'vuex'
import notify from './notify'
import globals from './globals'
import {firestore} from 'firebase'
import firebase from 'firebase/app'
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import User from './models/user'
import * as packageData from '../../package.json'
import eventHub from './eventHub';
import { Firestore } from '@google-cloud/firestore';
import messageConverter from './models/message';
Vue.use(Vuex)
let db : firestore.Firestore
const store = new Vuex.Store({
  state:{
    version:packageData.version as string,
    userInfo:{} as User,
    config:{
      preventNotify:false
    },
    selectedTeamRef:null as firestore.DocumentReference | null,
    teams:[] as firestore.DocumentReference[],
    messages:[] as any[]
  },
  mutations:{
    setUser(state, user){
      state.userInfo = new User(user)
    },
    addTeam(state, team:firestore.DocumentReference){
      state.teams.push(team)
    },
    async addMessage(state, message){
      state.messages.unshift(await messageConverter(message))
    },
    selectTeam(state, ref:firestore.DocumentReference){
      state.selectedTeamRef = ref
    }
  },
  actions:{
    async init(store){
      firebase.initializeApp(globals.API_CONFIG)
      let ui = firebaseui.auth.AuthUI.getInstance()
      if(!ui){
        ui = new firebaseui.auth.AuthUI(firebase.auth())
      }
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          store.dispatch('login', user)
          return
        }
      })
      ui.start('#firebase-auth-container', {
        callbacks:{
          signInSuccessWithAuthResult(authResult, redirectUrl){
            store.dispatch('login', authResult)
            return false
          }
        },
        signInFlow:'popup',
        signInSuccessUrl:location.href,
        signInOptions:[
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        privacyPolicyUrl:'privacy-policy.html',
        tosUrl:'tos.html'
      })
    },
    async login(store, user){
      db = firestore()
      db.settings({
        timestampsInSnapshots:true
      })
      const refDoc = db.collection('users').doc(user.email)
      refDoc.update({lastLogin:new Date()})
      const refMe = await refDoc.get()
      if(!refMe.exists){
        store.dispatch('showDialog', {
          level:'error',
          message:`${user.email}のユーザはログインしましたが、システムに登録されていません。管理者に登録を依頼してください`,
          clbk(){
            location.href = location.href
          }
        })
        return
      }
      store.commit('setUser', user)
      await store.dispatch('getTeams', refMe)
    },
    showDialog(store,{level,message,clbk}){
      eventHub.$emit('showDialog', message, level, clbk)
    },
    notify(store, m:string){
      notify.pop(m)
    },
    logout(){
      firebase.auth().signOut().then(()=>{
        location.href = location.href
      })
    },
    async getTeams(store, refMe){
      const teams = await db.collection('teams').where('users','array-contains', store.state.userInfo.email).get()
      teams.forEach(async team=>{
        const query = db.collection('messages').where('teams', 'array-contains',  team.ref)
        query.onSnapshot(messageSnapshot=>{
            messageSnapshot.forEach(mref=>{
              store.commit('addMessage', mref.data())
            })
          })
        store.commit('addTeam', team)
      })
    }
  }
})
export default store