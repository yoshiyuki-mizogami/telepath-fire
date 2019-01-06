<template>
  <div class="file">
    {{file.name}}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import File from '../ts/models/file'
export default Vue.extend({
  props:{
    file:File
  }
})
</script>
<style lang="styles">
</style>