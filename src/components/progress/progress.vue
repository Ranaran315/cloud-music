<template>
  <div :class="ucn.b()">
    <div
      :class="ucn.e('progress-track')"
      ref="progressTrackRef"
      @mousedown.stop="clickProgress"
    >
      <div :class="ucn.e('progress-bar')" :style="progressBarStyle">
        <div :class="ucn.e('progress-bar-dot')" ref="progressBarDotRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { computed, CSSProperties, ref } from 'vue'

const ucn = useClassName('progress')
defineOptions({
  name: 'CloudProgress',
})

const props = defineProps({
  beforeTraggle: Function,
  onTraggle: Function,
  afterTraggle: Function,
  width: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:width'])

const progressTrackRef = ref(null)
const progressBarDotRef = ref(null)
const progressBarStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.width}%`,
  }
})
const clickProgress = (e: MouseEvent) => {
  const targetElementX = e.clientX - e.offsetX
  // 获取进度条轨道的宽度
  const trackWidth = (progressTrackRef.value as unknown as HTMLElement)
    .offsetWidth
  let rateX = (e.offsetX / trackWidth) * 100
  emit('update:width', rateX)
  props.beforeTraggle?.(rateX)
  // 拖动进度条
  const traggleProgress = (e: MouseEvent) => {
    rateX = ((e.clientX - targetElementX) / trackWidth) * 100
    // 边界判断
    if (rateX > 100) rateX = 100
    else if (rateX < 0) rateX = 0
    emit('update:width', rateX)
    props.onTraggle?.(rateX)
  }
  window.addEventListener('mousemove', traggleProgress)
  // 拖动完成
  const traggleCompleted = () => {
    props.afterTraggle?.()
    window.removeEventListener('mousemove', traggleProgress)
    window.removeEventListener('mouseup', traggleCompleted)
  }
  // 鼠标松开时清除事件监听
  window.addEventListener('mouseup', traggleCompleted)
}
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'progress'
);

@include b() {
  display: flex;
  align-items: center;
  gap: 20px;
  user-select: none;
  @include e('progress-track') {
    position: relative;
    width: 300px;
    height: 5px;
    border-radius: 20px;
    background-color: getFillColor('third');
    cursor: pointer;
    transition: height 0.3s;
    &:hover {
      height: 8px;
      @include e('progress-bar') {
        @include e('progress-bar-dot') {
          display: block;
        }
      }
    }
    @include e('progress-bar') {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      border-radius: inherit;
      background-color: getColor('primary');
      @include e('progress-bar-dot') {
        pointer-events: none;
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: getFillColor();
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        display: none;
      }
    }
  }
}
</style>
