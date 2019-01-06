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
    <div id="auth-wrap" ref="auth-container" v-show="!userInfo.email">
      <div id="firebase-auth-container"></div>
    </div>
    <app-dialog/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex'
import Team from './team.vue'
import UserState from './user-state.vue'
import MessageForm from './message-form.vue'
export default Vue.extend({
  components:{
    Team,
    UserState,
    MessageForm
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
#auth-wrap
  background-color rgb(255, 200, 170)
  height 100%
  position fixed
  top 0
  left 0
  width 100%
  padding-top 3%

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
  border solid 3px rgb(200,255,200)
  background-color white
  min-width 10vw
button, input[type=button]
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

