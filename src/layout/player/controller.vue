<template>
  <div
    :class="[ucn.b(), ucn.is(playerStore.getState().showFullScreen, 'full')]"
  >
    <div :class="ucn.e('info')">
      <div
        :class="[
          ucn.e('pic'),
          ucn.is(playerStore.getState().isPlaying, 'playing'),
        ]"
      >
        <cloud-image :src="song?.al?.picUrl"></cloud-image>
      </div>
      <div :class="ucn.e('content')">
        <div :class="ucn.e('name')">{{ song?.name }}</div>
        <div :class="ucn.e('artist')">
          {{ song?.ar?.map((item) => item.name).join('/') }}
        </div>
      </div>
    </div>
    <Controls />
    <PlayerMenu />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { computed } from 'vue'
import Controls from './controls.vue'
import PlayerMenu from './menu.vue'
import { usePlayerStore } from '@/store'

const ucn = useClassName('controller', false)
defineOptions({
  name: 'Controller',
})

const playerStore = usePlayerStore()
const song = computed(() => playerStore.getState().currentSong)
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'controller',
  $use-namespace: false
);

@include b() {
  width: 100%;
  height: var(--player-controller-height);
  position: fixed;
  z-index: getZIndex('layout');
  bottom: 0;
  left: 0;
  background-color: getFillColor('secondary');
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  @include e('info') {
    width: 30%;
    display: flex;
    align-items: center;
    gap: 10px;
    @include e('content') {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
      @include e('name') {
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @include e('artist') {
        max-width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    @include e('pic') {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 10px;
      background-color: #000;
      animation: rotate 10s linear infinite;
      animation-play-state: paused;
      &.is-playing {
        animation-play-state: running;
      }
    }
  }
}

// 全屏样式
@include is('full') {
  background-color: transparent;
  color: getFillColor();
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
