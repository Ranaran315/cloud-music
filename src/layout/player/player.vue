<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('info')">
      <div :class="ucn.e('pic')">
        <cloud-image :src="song.al?.picUrl"></cloud-image>
      </div>
      <div :class="ucn.e('content')">
        <div :class="ucn.e('name')">{{ song.name }}</div>
        <div :class="ucn.e('artist')">
          {{ song.ar?.map((item) => item.name).join('/') }}
        </div>
      </div>
    </div>
    <div :class="ucn.e('controller')">
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
        <div :class="ucn.e('time')">00:00</div>
        <div
          :class="ucn.e('progress-track')"
          ref="progressTrackRef"
          @mousedown.stop="handleClick"
        >
          <div :class="ucn.e('progress-bar')" :style="progressBarStyle">
            <div
              :class="ucn.e('progress-bar-dot')"
              ref="progressBarDotRef"
            ></div>
          </div>
        </div>
        <div :class="ucn.e('time')">04:03</div>
      </div>
    </div>
    <h2>占位符</h2>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { useSongStore } from '@/store'
import { computed, CSSProperties, ref } from 'vue'
import { RaIcon } from '@capybara-plus/vue'
import { PrevSong, NextSong, Play, Stop } from '@/icons'

const ucn = useClassName('player', false)
defineOptions({
  name: 'Player',
})

// 播放控制
const isPlaying = ref(false)
const play = () => {
  isPlaying.value = !isPlaying.value
}

// 进度条
const progressTrackRef = ref(null)
const progressBarDotRef = ref(null)
const progressBarWidth = ref(0)
const progressBarStyle = computed<CSSProperties>(() => {
  return {
    width: `${progressBarWidth.value}%`,
  }
})
const handleClick = (e: MouseEvent) => {
  // 如果点击的是进度条的圆点则不执行
  if (e.target == progressBarDotRef.value) return
  // 获取进度条轨道的宽度
  const trackWidth = (progressTrackRef.value as unknown as HTMLElement)
    .offsetWidth
  progressBarWidth.value = (e.offsetX / trackWidth) * 100
  const targetElementX = e.clientX - e.offsetX
  // 拖动进度条
  const traggleProgress = (e: MouseEvent) => {
    let rateX = ((e.clientX - targetElementX) / trackWidth) * 100
    // 边界判断
    if (rateX > 100) rateX = 100
    else if (rateX < 0) rateX = 0
    // 更新进度条宽度
    progressBarWidth.value = rateX
  }
  // 鼠标移动时拖动进度条
  window.addEventListener('mousemove', traggleProgress)
  // 清除事件监听
  const clearEventListener = () => {
    window.removeEventListener('mousemove', traggleProgress)
    window.removeEventListener('mouseup', clearEventListener)
  }
  // 鼠标松开时清除事件监听
  window.addEventListener('mouseup', clearEventListener)
}

const songStore = useSongStore()
const song = computed(() => songStore.currentSong)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'player',
  $use-namespace: false
);

@include b() {
  width: 100%;
  height: var(--player-height);
  position: fixed;
  z-index: var(--layout-z-index);
  bottom: 0;
  left: 0;
  background-color: getFillColor('secondary');
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  @include e('info') {
    display: flex;
    align-items: center;
    gap: 10px;
    @include e('pic') {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 10px;
      background-color: #000;
    }
  }
  @include e('controller') {
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
}
</style>
