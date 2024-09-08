<template>
  <div :class="[ucn.b(), ucn.is(playerContext?.state.showViwes, 'views')]">
    <audio
      ref="audioRef"
      :src="playerContext?.state.song.url"
      @loadedmetadata="handleLoadedmetadata"
      @timeupdate.stop="handleTimeUpdate"
      @ended="handleEnded"
    ></audio>
    <div :class="ucn.e('button-group')">
      <cloud-icon
        :icon="PrevSong"
        :class="ucn.e('prev-next-button')"
        @click="toPlaylistStore.prev()"
      />
      <cloud-icon
        :icon="playerContext?.state.isPlaying ? Stop : Play"
        :class="ucn.e('play-button')"
        @click="play"
      />
      <cloud-icon
        :icon="NextSong"
        :class="ucn.e('prev-next-button')"
        @click="toPlaylistStore.next()"
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
  inject,
  nextTick,
} from 'vue'
import { PrevSong, NextSong, Play, Stop } from '@/icons'
import { useToPlaylistStore } from '@/store'
import { playerContextKey } from './context'
import PlayerVolume from './volume.vue'

const ucn = useClassName('controls', false)
defineOptions({
  name: 'Controls',
})

const playerContext = inject(playerContextKey, undefined)

// 播放控制
const audioRef = ref<HTMLAudioElement | null>(null)
const duration = computed(() => playerContext?.state.song.dt) // 歌曲总时长
const currentTime = ref(0) // 当前播放时间
// 点击播放按钮
const play = () => {
  playerContext?.changePlaying()
  nextTick(() => {
    doPlay()
  })
}

// 执行播放，根据 isPlaying 控制音乐播放
const doPlay = async () => {
  try {
    const audio = audioRef.value
    if (!audio) return
    if (playerContext?.state.isPlaying) {
      await audio.play()
    } else {
      audio.pause()
    }
  } catch (error) {
    console.log(error)
  }
}

// 当音乐加载完成时
const handleLoadedmetadata = () => {
  console.log('加载音乐完成')
  doPlay()
}

const progressBarWidth = ref(0) // 进度条宽度
// 处理 audio 播放时间更新时
const handleTimeUpdate = (e: Event) => {
  playerContext?.recordCurrentTime((e.target as HTMLAudioElement).currentTime)
  // 拖动进度条时不处理
  if (userIsController.value) return
  currentTime.value = (e.target as HTMLAudioElement).currentTime * 1000
  progressBarWidth.value = (currentTime.value / duration.value!) * 100
}

// 进度条
const userIsController = ref(false) // 用户是否在拖动、点击进度条

const handleBeforeTraggle = (rate: number) => {
  userIsController.value = true
  currentTime.value = (rate / 100) * duration.value!
}

const handleOnTraggle = (rate: number) => {
  currentTime.value = (rate / 100) * duration.value!
}

const handleAftreTraggle = () => {
  // 更新 audio 的实际播放时间
  // 因为 currentTime 是秒，然后这里的 currentTime 是毫秒
  audioRef.value!.currentTime = currentTime.value / 1000
  userIsController.value = false
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
  playerContext?.setAudio(audioRef.value!)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleSpace)
})

// 播放结束
const toPlaylistStore = useToPlaylistStore()
const handleEnded = () => {
  console.log('播放完成')
  toPlaylistStore.next()
}
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

@include is('views') {
  @include e('progress') {
    width: 100%;
    position: absolute;
    top: 0;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
