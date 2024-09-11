<template>
  <n-image
    :class="ucn.b()"
    :src="src"
    width="100%"
    :preview-disabled="!preview"
    @load="handleLoad"
    :object-fit="objectFit"
    :lazy="lazy"
  ></n-image>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
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
  objectFit: {
    type: definePropType<'fill' | 'cover' | 'contain' | 'none' | 'scale-down'>(
      String
    ),
    default: 'cover',
  },
  lazy: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['load'])

const handleLoad = (e: Event) => {
  emit('load', e)
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'image'
);

@include b() {
  border-radius: inherit;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>
