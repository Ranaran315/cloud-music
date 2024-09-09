<template>
  <div :class="ucn.b()"></div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'

const ucn = useClassName('synthesis', false)
defineOptions({
  name: 'Synthesis',
})
</script>

<style scoped lang="scss"></style>
