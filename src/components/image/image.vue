<template>
  <n-image
    :class="ucn.b()"
    :src="src"
    width="100%"
    :preview-disabled="!preview"
    @load="handleLoad"
    :object-fit="objectFit"
    :lazy="lazy"
    :img-props="{
      crossorigin: 'anonymous',
    }"
  >
    <template #placeholder>
      <div :class="ucn.e('placeholder')"></div>
    </template>
  </n-image>
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

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'image'
);

@include b() {
  border-radius: inherit;
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
  @include e('placeholder') {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #efe8e8;
    border-radius: inherit;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20%;
      height: 150%;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: #f0f0f0;
      animation: loading 1.2s linear infinite;
    }
  }
}

img {
  height: auto !important;
}

@keyframes loading {
  from {
    transform: translate(-100%, -100%) rotate(45deg);
  }
  to {
    transform: translate(100%, 100%) rotate(45deg);
  }
}
</style>
