<template>
  <ra-button :class="[ucn.b(), ucn.m(type)]">
    <slot></slot>
  </ra-button>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaButton } from '@capybara-plus/vue'

const ucn = useClassName('button')

defineOptions({
  name: 'CloudButton',
})

defineProps({
  type: {
    type: String,
    default: 'default',
    validate: (value: string) => ['primary', 'default'].includes(value),
  },
})
</script>

<style scoped lang="scss" src="@/style/components/button.scss"></style>
