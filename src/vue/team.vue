<template>
  <div
   class="team"
   @click="selectThisTeam"
   :class="{selected:selectedTeamRef === this.team}"
   :style="{'border-left-color':teamData.color}">
    {{teamData.name}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex'
export default Vue.extend({
  props:{
    team:Object
  },
  computed:{
    ...mapState(['selectedTeamRef']),
    teamData():any{
      return this.team.data()
    }
  },
  methods:{
    selectThisTeam(){
      this.$store.commit('selectTeam', this.team)
    }
  }
})
</script>
<style lang="stylus">
.team
  padding 3px 5px
  background-color white
  border-left-width 10px
  border-left-style solid
  cursor pointer
  &.selected
    font-weight bold
    color rgb(255, 180,100)
</style>