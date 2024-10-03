<template>
  <div :class="[ucn.b(), ucn.m(type)]" :style="style"></div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { computed, CSSProperties } from 'vue'

const ucn = useClassName('skeleton-item')
defineOptions({
  name: 'CloudSkeletonItem',
})

const props = defineProps({
  type: {
    type: definePropType<'square' | 'circle' | 'line'>(String),
    default: 'square',
  },
  size: {
    type: [String, Number],
  },
})

const style = computed<CSSProperties>(() => {
  if (!props.size) return {}
  const size = /\d+/.test(props.size + '') ? `${props.size}px` : props.size
  if (props.type == 'line') {
    return {
      width: '100%',
      height: size,
    }
  }
  return {
    width: size,
    height: size,
  }
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'skeleton-item'
);

@include b() {
  width: 200px;
  height: 200px;
  border-radius: getBorderRadius();
  background: linear-gradient(
    to right,
    #{getFillColor('secondary')} 25%,
    #{getFillColor('third')} 50%,
    #{getFillColor('secondary')} 25%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

@include m('circle') {
  border-radius: 50%;
}

@include m('line') {
  height: 20px;
}

@keyframes skeleton-loading {
  from {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}
</style>
