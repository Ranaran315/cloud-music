<template>
  <div :class="ucn.b()">
    <n-popover raw trigger="hover" to="#app">
      <template #trigger>
        <cloud-icon
          @click.stop="changeMuted"
          :icon="isMuted ? VolumeOff : Volume"
          :class="ucn.e('volume-button')"
        ></cloud-icon>
      </template>
      <template #default>
        <div :class="ucn.e('popover')">
          <cloud-progress
            :class="ucn.e('progress')"
            direction="y"
            v-model="volume"
          ></cloud-progress>
          <div :class="ucn.e('volume')">{{ volume.toFixed(0) }}</div>
        </div>
      </template>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { Volume } from '@/icons'
import { NPopover } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'
import VolumeOff from '@/icons/volume-off.vue'
import { usePlayerStore } from '@/store'

const ucn = useClassName('player-volume', false)
defineOptions({
  name: 'PlayerVolume',
})

const playerStore = usePlayerStore()

const volume = ref<number>(100)
const isMuted = computed(() => playerStore.getState().isMuted)

/**
 * @description 初始化音量
 */
function init() {
  volume.value = playerStore.getState().volume * 100
}

// 监听音量变化并设置 audio 的真实音量
watch(
  () => volume.value,
  (value: number) => {
    playerStore.toggleMuted(value <= 0)
    playerStore.setVolume(value / 100)
  }
)

// 修改静音状态
const changeMuted = () => {
  playerStore.toggleMuted()
}

onMounted(() => {
  init()
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'player-volume',
  $use-namespace: false
);

@include b() {
  @include e('volume-button') {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
@include e('popover') {
  width: 30px;
  height: 150px;
  padding: 10px 0;
  box-sizing: border-box;
  background-color: getFillColor();
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  @include e('progress') {
    width: fit-content;
  }
  @include e('volume') {
    font-size: 0.7rem;
    color: getTextColor('secondary');
  }
}
</style>
