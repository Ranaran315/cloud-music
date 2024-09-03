<template>
  <div :class="ucn.b()">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'

const ucn = useClassName('tag')

defineOptions({
  name: 'CloudTag',
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'tag'
);

@include b() {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 5px;
  border-radius: 4px;
  background-color: getColor('primary');
  color: getFillColor();
  font-size: 0.7rem;
  cursor: pointer;
}
</style>
