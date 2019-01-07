<template>
  <div id="app">
    <div class="title">Telepath Fire <span class="version">version {{version}} presented by mz</span>
      <user-state/>
    </div>
    <div class="main-content">
      <div class="teams">
        <team v-for="t in teams" :key="t.id" :team="t"/>
      </div>
      <div class="right-pane">
        <message-form/>
        <div class="messages">
          <message v-for="m in messages" :key="m.id" :messageRef="m"/>
        </div>
      </div>
    </div>
    <login-form v-if="!userInfo.email"/>
    <app-dialog/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex'
import Team from './team.vue'
import UserState from './user-state.vue'
import MessageForm from './message-form.vue'
import LoginForm from './login.vue'
export default Vue.extend({
  components:{
    Team,
    UserState,
    MessageForm,
    LoginForm
  },
  computed:{
    ...mapState(['version', 'teams', 'messages', 'userInfo'])
  },
  mounted(){
    this.$store.dispatch('init')
  }
})
</script>

<style lang="stylus">
titleHeight = 35px
*
  box-sizing border-box
html,body
  margin 0
  padding 0
  font-family Meiryo
  font-size 1rem
  height 100%
input,button, select, textarea
  font-family inherit
  padding 5px 10px
  min-width 10vw
button, input[type=button]
  background-color white
  border solid 3px rgb(200,255,200)
  cursor pointer
button:hover, input[type=button]:hover
  border-color rgb(255, 200,200)
#app
  height 100%
.title
  text-indent 15px
  font-size 25px
  background-color rgb(255,233,200)
  height titleHeight
  .version
    font-size small
    color gray
.main-content
  height "calc(100% - %s)" % titleHeight
  display flex
.teams
  height 100%
  background-color rgb(255, 211, 190)
  flex-basis 200px
.right-pane
  flex-grow 1
  height 100%
formHeight = 90px
.message-form
  height formHeight
.messages
  height "calc(100% - %s)" % formHeight
  overflow-y scroll

</style>

