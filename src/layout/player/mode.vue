<template>
  <cloud-tooltip :content="mode.content">
    <cloud-icon
      :class="ucn.b()"
      :icon="mode.icon"
      size="1.2rem"
      @click.stop="toggleMode"
    >
    </cloud-icon>
  </cloud-tooltip>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { SingalLoop, ListLoop, ShufflePlay } from '@/icons'
import { PlayModes, usePlayerStore } from '@/store'
import { computed } from 'vue'

const ucn = useClassName('player-mode', false)
defineOptions({
  name: 'PlayerMode',
})

const playerStore = usePlayerStore()
const playerModeMap: {
  [prop in PlayModes]: any
} = {
  singleLoop: {
    icon: SingalLoop,
    content: '单曲循环',
  },
  listLoop: {
    icon: ListLoop,
    content: '列表循环',
  },
  shuffle: {
    icon: ShufflePlay,
    content: '随机播放',
  },
}

const mode = computed(() => {
  return playerModeMap[playerStore.getState().playMode]
})

const toggleMode = () => {
  playerStore.togglePlayMode()
}
</script>

<style lang="scss"></style>
