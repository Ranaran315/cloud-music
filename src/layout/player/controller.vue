<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('info')">
      <div
        :class="[
          ucn.e('pic'),
          ucn.is(playerContext?.state.isPlaying, 'playing'),
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
import { computed, inject } from 'vue'
import Controls from './controls.vue'
import PlayerMenu from './menu.vue'
import { playerContextKey } from './context'

const ucn = useClassName('controller', false)
defineOptions({
  name: 'Controller',
})

const playerContext = inject(playerContextKey, undefined)
const song = computed(() => playerContext?.state.song)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'controller',
  $use-namespace: false
);

@include b() {
  width: 100%;
  height: var(--player-controller-height);
  position: fixed;
  z-index: var(--layout-z-index);
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

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
