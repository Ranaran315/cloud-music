<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('header')">
      <div :class="ucn.e('title')">{{ title }}</div>
      <div :class="ucn.e('more')" @click.stop="handleMore">查看更多</div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'

const ucn = useClassName('search-synthesis-item', false)
defineOptions({
  name: 'SearchSynthesisItem',
})

defineProps({
  title: String,
})

const emit = defineEmits(['more'])

const handleMore = () => {
  emit('more')
}
</script>

<style scoped lang="scss">
@use '@/style//bem' as *
  with($block: 'search-synthesis-item', $use-namespace: false);

@include b() {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @include e('header') {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @include e('title') {
      font-size: 1.5rem;
      font-weight: bold;
    }
    @include e('more') {
      font-size: 14px;
      color: getTextColor('secondary');
      cursor: pointer;
      &:hover {
        color: getColor('primary');
      }
    }
  }
}
</style>
