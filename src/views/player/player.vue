<template>
  <div :class="ucn.b()">
    <h1>Hello</h1>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'

const ucn = useClassName('player', false)
defineOptions({
  name: 'Player',
})
</script>

<style scoped lang="scss"></style>
