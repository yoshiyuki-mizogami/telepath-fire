<template>
  <div class="user-state-wrap" @click="showUserStateMenu">
    <div class="user-state">
      <img class="user-icon" :src="userInfo.photoURL" alt="user-icon">
      <div class="user-name">{{userInfo.displayName}}</div>
      <div class="user-state-menu" v-show="showMenu" @mouseleave="hideUserStateMenu">
        <div class="user-state-menu-item logout" @click="logout">Logout</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
export default Vue.extend({
  data(){
    return {
      showMenu:false
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
    showUserStateMenu(){
      this.showMenu = true
    },
    hideUserStateMenu(){
      this.showMenu = false
    },
    ...mapActions({
      logout:'logout'
    })
  }
})
</script>

<style lang="stylus">
stateWidth = 300px
iconSize = 35px
.user-state-wrap
  cursor pointer
  display inline-block
  position fixed
  right 0
  top 0
  width stateWidth
  height 35px
.user-state
  height 100%
  vertical-align bottom
  font-size 20px
  width stateWidth
  display flex
  .user-icon
    width iconSize
    height iconSize
    border-radius 100%
  .user-name
    display inline-block
    vertical-align bottom
    width stateWidth - iconSize
  .user-state-menu
    position absolute
    top 35px
    left iconSize
    width stateWidth - iconSize
    background-color rgb(233,233,244)
    font-size 1rem
    .user-state-menu-item
      padding 3px 5px
      &:hover
        background-color rgb(255, 200,180)
</style>
