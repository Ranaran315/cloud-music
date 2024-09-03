<template>
  <n-image
    :class="ucn.b()"
    :src="src"
    width="100%"
    :preview-disabled="!preview"
  ></n-image>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { NImage } from 'naive-ui'

const ucn = useClassName('image')
defineOptions({
  name: 'CloudImage',
})

defineProps({
  src: String,
  /**
   * @description 是否展示预览效果
   */
  preview: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'image'
);

@include b() {
  border-radius: inherit;
  cursor: pointer;
}
</style>
