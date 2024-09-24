<template>
  <cloud-icon :class="ucn.b()" :icon="icon" size="1.2" @click.stop="toggleMode">
  </cloud-icon>
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
  singleLoop: SingalLoop,
  listLoop: ListLoop,
  shuffle: ShufflePlay,
}

const icon = computed(() => {
  return playerModeMap[playerStore.getState().playMode]
})

const toggleMode = () => {
  playerStore.togglePlayMode()
}
</script>

<style lang="scss"></style>
