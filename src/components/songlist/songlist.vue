<template>
  <div :class="ucn.b()">
    
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'

const ucn = useClassName('songlist', false)
defineOptions({
  name: 'Songlist',
})
</script>

<style scoped lang="scss"></style>
