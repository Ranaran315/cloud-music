<template>
  <div :class="[ucn.b(), ucn.is(direction == 'y', 'vertical')]">
    <div
      :class="ucn.e('track')"
      ref="progressTrackRef"
      @mousedown.stop="clickProgress"
    >
      <div :class="ucn.e('bar')" :style="progressBarStyle">
        <div
          :class="ucn.e('dot')"
          ref="progressBarDotRef"
          :style="progressBarDotStyle"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { computed, CSSProperties, ref } from 'vue'

const ucn = useClassName('progress')
defineOptions({
  name: 'CloudProgress',
})

const props = defineProps({
  beforeTraggle: Function,
  onTraggle: Function,
  afterTraggle: Function,
  modelValue: {
    type: Number,
    required: true,
  },
  direction: {
    type: definePropType<'x' | 'y'>(String),
    default: 'x',
  },
})

const emit = defineEmits(['update:modelValue'])

const progressTrackRef = ref(null)
const progressBarDotRef = ref(null)
const progressBarStyle = computed<CSSProperties>(() => {
  if (props.direction === 'x') {
    return {
      width: `${props.modelValue}%`,
      left: 0,
    }
  } else {
    return {
      height: `${props.modelValue}%`,
      bottom: 0,
    }
  }
})
const progressBarDotStyle = computed<CSSProperties>(() => {
  if (props.direction === 'x') {
    return {
      top: '50%',
      right: 0,
      transform: 'translate(50%, -50%)',
    }
  } else {
    return {
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }
})
const clickProgress = (e: MouseEvent) => {
  let targetElementDistance: number // 元素距离屏幕左侧或上侧的距离
  let trackSize: number // 轨道的宽度或高度
  let rate: number // 进度条与轨道的比例
  if (props.direction === 'x') {
    targetElementDistance = e.clientX - e.offsetX
    trackSize = (progressTrackRef.value as unknown as HTMLElement).offsetWidth
    rate = (e.offsetX / trackSize) * 100
  } else {
    targetElementDistance = e.clientY - e.offsetY
    trackSize = (progressTrackRef.value as unknown as HTMLElement).offsetHeight
    rate = ((trackSize - e.offsetY) / trackSize) * 100
  }
  emit('update:modelValue', rate)
  props.beforeTraggle?.(rate)
  // 拖动进度条
  const traggleProgress = (e: MouseEvent) => {
    if (props.direction == 'x') {
      rate = ((e.clientX - targetElementDistance) / trackSize) * 100
    } else {
      rate =
        ((trackSize - (e.clientY - targetElementDistance)) / trackSize) * 100
    }
    // 边界判断
    if (rate > 100) rate = 100
    else if (rate < 0) rate = 0
    emit('update:modelValue', rate)
    props.onTraggle?.(rate)
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
  width: 100%;
  @include e('track') {
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 20px;
    background-color: getFillColor('third');
    cursor: pointer;
    transition: height 0.3s;
    &:hover {
      height: 8px;
      @include e('bar') {
        @include e('dot') {
          display: block;
        }
      }
    }
    @include e('bar') {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: getColor('primary');
      pointer-events: none;
      @include e('dot') {
        pointer-events: none;
        content: '';
        position: absolute;
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

@include is('vertical') {
  height: 100%;
  @include e('track') {
    width: 5px;
    height: 100%;
    transition: width 0.3s;
    @include e('dot') {
      top: 100%;
    }
    &:hover {
      width: 8px;
      @include e('bar') {
        @include e('dot') {
          display: block;
        }
      }
    }
  }
}
</style>
