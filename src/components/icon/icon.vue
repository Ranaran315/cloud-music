<template>
  <ra-icon :size="size" :class="ucn.b()">
    <component :is="icon" />
  </ra-icon>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon } from '@capybara-plus/vue'

const ucn = useClassName('icon')
defineOptions({
  name: 'CloudIcon',
})

defineProps({
  size: Number,
  icon: Object,
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'icon',
  $use-namespace: false
);

@include b() {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: currentColor;
  }
  &:hover {
    color: getColor('primary');
  }
}
</style>
