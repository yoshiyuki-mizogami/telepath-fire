<template>
  <div id="app">
    <div class="title">Telepath Fire <span class="version">version {{version}} presented by mz</span></div>
    <div class="main-content">
      <div class="teams">
        <team v-for="t in teams" :key="t.id" :team="t"/>
      </div>
      <div class="messages">
        <message v-for="m in messages" :key="m.id" :message="m"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex'
import Team from './team.vue'
export default Vue.extend({
  components:{
    Team
  },
  computed:{
    ...mapState(['version', 'teams', 'messages'])
  }
})
</script>

<style lang="stylus">
titleHeight = 30px
*
  box-sizing border-box
html,body
  margin 0
  padding 0
  font-family Meiryo
  font-size 1.2rem
  height 100%
#app
  height 100%
.title
  text-indent 15px
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
  width 200px
</style>

