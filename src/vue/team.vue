<template>
  <div class="team">
    {{team.name}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props:{
    team:Object
  }
})
</script>
<style lang="stylus">
</style>