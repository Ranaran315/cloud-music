<template>
  <div :class="ucn.b()" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { isNumber } from '@/utils/type'
import { computed } from 'vue'

const ucn = useClassName('row')
defineOptions({
  name: 'CloudRow',
})

const props = defineProps({
  gap: [String, Number],
  justify: String,
  align: String,
})

const style = computed(() => {
  const gap = isNumber(props.gap) ? `${props.gap}px` : props.gap
  return {
    gap,
    justifyContent: props.justify,
    alignItems: props.align,
  }
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'row'
);

@include b() {
  @include flex();
  flex: 1;
}
</style>
