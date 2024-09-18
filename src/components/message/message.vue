<template>
  <div class=""></div>
</template>

<script setup lang="ts">
import { RaMessage } from '@capybara-plus/vue'

defineOptions({
  name: 'CloudMessage',
})

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  content: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

RaMessage({
  theme: props.type,
  content: props.content,
  duration: props.duration,
  zIndex: 3000,
  loading: props.loading,
})
</script>

<style scoped lang="scss"></style>
