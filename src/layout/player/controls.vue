<template>
  <div :class="ucn.b()">
    <audio
      ref="audioRef"
      :src="url"
      @canplaythrough="handleCanplaythrough"
      @timeupdate.stop="handleTimeUpdate"
    ></audio>
    <div :class="ucn.e('button-group')">
      <ra-icon :class="ucn.e('prev-next-button')">
        <PrevSong />
      </ra-icon>
      <ra-icon :class="ucn.e('play-button')" @click="play">
        <component :is="isPlaying ? Stop : Play" />
      </ra-icon>
      <ra-icon :class="ucn.e('prev-next-button')">
        <NextSong />
      </ra-icon>
    </div>
    <div :class="ucn.e('progress')">
      <div :class="ucn.e('time')">{{ formatDuration(currentTime) }}</div>
      <div
        :class="ucn.e('progress-track')"
        ref="progressTrackRef"
        @mousedown.stop="clickProgress"
      >
        <div :class="ucn.e('progress-bar')" :style="progressBarStyle">
          <div :class="ucn.e('progress-bar-dot')" ref="progressBarDotRef"></div>
        </div>
      </div>
      <div :class="ucn.e('time')">{{ duration }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { formatDuration } from '@/utils/format'
import { isBoolean } from '@/utils/type'
import {
  type CSSProperties,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  nextTick,
} from 'vue'
import { PrevSong, NextSong, Play, Stop } from '@/icons'
import { RaIcon } from '@capybara-plus/vue'

const ucn = useClassName('controls', false)
defineOptions({
  name: 'Controls',
})

const props = defineProps({
  url: String,
  duration: {
    type: Number,
    default: 1,
  },
  isPlaying: Boolean, // 是否正在播放
})

const emit = defineEmits({
  'upadte:isPlaying': (value: boolean) => isBoolean(value),
})

// 播放控制
const audioRef = ref<HTMLAudioElement | null>(null)
const duration = computed(() => formatDuration(props.duration)) // 歌曲总时长
const currentTime = ref(0) // 当前播放时间
// 点击播放按钮
const play = () => {
  emit('upadte:isPlaying', !props.isPlaying)
  nextTick(() => {
    doPlay()
  })
}
// 根据 isPlaying 控制音乐播放
const doPlay = async () => {
  try {
    if (!audioRef.value) return
    if (props.isPlaying) {
      await audioRef.value.play()
    } else {
      audioRef.value.pause()
    }
  } catch (error) {
    console.log(error)
  }
}

// 当音乐加载完成时
const handleCanplaythrough = () => {
  console.log('加载音乐完成')
  doPlay()
}

// 处理 audio 播放时间更新时
const handleTimeUpdate = (e: Event) => {
  // 拖动进度条时不处理
  if (userIsController.value) return
  currentTime.value = (e.target as HTMLAudioElement).currentTime * 1000
  progressBarWidth.value = (currentTime.value / props.duration) * 100
}

// 进度条
const userIsController = ref(false) // 用户是否在拖动、点击进度条
const progressTrackRef = ref(null)
const progressBarDotRef = ref(null)
const progressBarWidth = ref(0)
const progressBarStyle = computed<CSSProperties>(() => {
  return {
    width: `${progressBarWidth.value}%`,
  }
})
// 点击进度条
const clickProgress = (e: MouseEvent) => {
  userIsController.value = true
  // if (e.target == progressBarDotRef.value) return
  const targetElementX = e.clientX - e.offsetX
  // 获取进度条轨道的宽度
  const trackWidth = (progressTrackRef.value as unknown as HTMLElement)
    .offsetWidth
  let rateX = (e.offsetX / trackWidth) * 100
  progressBarWidth.value = rateX // 更新进度条宽度
  currentTime.value = (rateX / 100) * props.duration

  // 拖动进度条
  const traggleProgress = (e: MouseEvent) => {
    rateX = ((e.clientX - targetElementX) / trackWidth) * 100
    // 边界判断
    if (rateX > 100) rateX = 100
    else if (rateX < 0) rateX = 0
    // 更新进度条宽度
    progressBarWidth.value = rateX
    // 更新当前播放时间
    currentTime.value = (rateX / 100) * props.duration
  }
  window.addEventListener('mousemove', traggleProgress)
  // 拖动完成
  const traggleCompleted = () => {
    userIsController.value = false
    audioRef.value!.currentTime = currentTime.value / 1000 // 因为 currentTime 是秒，然后这里的 currentTime 是毫秒
    window.removeEventListener('mousemove', traggleProgress)
    window.removeEventListener('mouseup', traggleCompleted)
  }
  // 鼠标松开时清除事件监听
  window.addEventListener('mouseup', traggleCompleted)
}

// 空格播放
const handleSpace = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    e.preventDefault()
    play()
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleSpace)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleSpace)
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'controls', $use-namespace: false);

@include b() {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  @include e('button-group') {
    display: flex;
    align-items: center;
    gap: 15px;
    @include e('play-button') {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: getColor('primary');
      color: getFillColor() !important;
      border-radius: 50%;
      cursor: pointer;
      padding: 10px;
      box-sizing: border-box;
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
    @include e('prev-next-button') {
      width: 20px;
      height: 20px;
    }
  }
  @include e('progress') {
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
    @include e('time') {
      font-size: 0.7rem;
      color: getTextColor('secondary');
    }
  }
}
</style>
