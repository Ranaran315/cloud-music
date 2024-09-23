<template>
  <div
    :class="[ucn.b(), ucn.is(playerStore.getState().showFullScreen, 'full')]"
  >
    <audio
      ref="audioRef"
      :src="playerStore.getState().currentSong?.url"
      @loadedmetadata="handleLoadedmetadata"
      @timeupdate.stop="handleTimeUpdate"
      @ended="handleEnded"
    />
    <div :class="ucn.e('group')">
      <cloud-icon
        :icon="PrevSong"
        :class="ucn.e('prev-next-button')"
        @click="playerStore.prev()"
      />
      <cloud-icon
        :icon="playerStore.getState().isPlaying ? Stop : Play"
        :class="ucn.e('play-button')"
        @click="play"
      />
      <cloud-icon
        :icon="NextSong"
        :class="ucn.e('prev-next-button')"
        @click="playerStore.next()"
      />
      <PlayerVolume />
    </div>
    <div :class="ucn.e('progress')">
      <div :class="ucn.e('time')">{{ formatDuration(currentTime) }}</div>
      <cloud-progress
        direction="x"
        v-model="progressBarWidth"
        :before-traggle="handleBeforeTraggle"
        :on-traggle="handleOnTraggle"
        :after-traggle="handleAftreTraggle"
      ></cloud-progress>
      <div :class="ucn.e('time')">{{ formatDuration(duration) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { formatDuration } from '@/utils/format'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect,
  watch,
} from 'vue'
import { PrevSong, NextSong, Play, Stop } from '@/icons'
import { usePlayerStore } from '@/store'
import PlayerVolume from './volume.vue'

const ucn = useClassName('controls', false)
defineOptions({
  name: 'Controls',
})

const playerStore = usePlayerStore()

const duration = computed(() => playerStore.getState().currentSong?.dt) // 歌曲总时长
const audioRef = ref<HTMLAudioElement | null>(null) // audio 模板引用

/**
 * @description 响应式更新 audio 的音量和静音状态
 */
watchEffect(() => {
  const audio = audioRef.value
  if (!audio) return
  audio.volume = playerStore.getState().volume
  audio.muted = playerStore.getState().isMuted
})

/**
 * @description 初始化设置
 */
function init() {
  playerStore.init(audioRef.value!) // 设置 audio
}

/**
 * @description 点击播放按钮
 */
const play = () => {
  playerStore.togglePlay()
  // doPlay()
}

/**
 * @description 执行播放，根据 isPlaying 控制音乐播放
 */
const doPlay = async () => {
  try {
    const audio = audioRef.value
    if (!audio) return
    if (playerStore.getState().isPlaying) {
      await audio.play()
    } else {
      audio.pause()
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * @description 当音乐加载完成时
 */
const handleLoadedmetadata = () => {
  console.log('加载音乐完成')
  doPlay()
}

/**
 * @description 当前播放的时间
 */
const currentTime = ref<number>(0)
watch(
  () => currentTime.value,
  (newVal) => {
    if (userIsController.value) return
    playerStore.recordCurrentTime(newVal)
  }
)

/**
 * @description 进度条组件相关钩子
 */
const progressBarWidth = ref(0) // 进度条宽度
const userIsController = ref(false) // 用户是否在拖动、点击进度条
const handleBeforeTraggle = (rate: number) => {
  userIsController.value = true
  currentTime.value = (rate / 100) * duration.value!
}
const handleOnTraggle = (rate: number) => {
  currentTime.value = (rate / 100) * duration.value!
}
const handleAftreTraggle = () => {
  userIsController.value = false
  playerStore.updateAudioTime(currentTime.value)
}

/**
 * @description 处理 audio 播放时间更新时
 * @param e
 */
const handleTimeUpdate = (e: Event) => {
  // 拖动进度条时不处理
  if (userIsController.value) return
  currentTime.value = (e.target as HTMLAudioElement).currentTime * 1000
  progressBarWidth.value = (currentTime.value / duration.value!) * 100
}

/**
 * @description 空格控制播放行为
 * @param e
 */
const handleSpace = (e: KeyboardEvent) => {
  // 如果在输入框中按下空格键，则不触发
  if ((e.target as any)?.closest('input, textarea, [contenteditable="true"]'))
    return
  if (e.code === 'Space') {
    e.preventDefault()
    play()
  }
}

onMounted(() => {
  init()
  window.addEventListener('keydown', handleSpace)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleSpace)
})

/**
 * @description 播放结束
 */
const handleEnded = () => {
  playerStore.end()
}
</script>

<style lang="scss">
@use '@/style/bem' as * with($block: 'controls', $use-namespace: false);

@include b() {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  @include e('group') {
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
        :deep(.icon) {
          color: getFillColor() !important;
        }
      }
    }
    @include e('prev-next-button') {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  @include e('progress') {
    width: 400px;
    display: flex;
    align-items: center;
    gap: 20px;
    user-select: none;
    @include e('time') {
      font-size: 0.7rem;
      color: getTextColor('secondary');
    }
  }
}

@include is('full') {
  @include e('progress') {
    width: 100%;
    position: absolute;
    top: 0;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
