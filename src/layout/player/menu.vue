<template>
  <div :class="ucn.b()">
    <ra-icon>
      <component :is="songStore.currentIsLiked ? Liked : Like" />
    </ra-icon>
    <ra-icon>
      <Comment />
    </ra-icon>
    <ra-icon @click.stop="changeFullScreen">
      <component
        :is="playerContext?.state.showViwes ? NoFullScreen : FullScreen"
      />
    </ra-icon>
    <ToPlaylist />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import ToPlaylist from './to-playlist.vue'
import { RaIcon } from '@capybara-plus/vue'
import { Like, Comment, FullScreen, Liked } from '@/icons'
import { inject } from 'vue'
import { playerContextKey } from './context'
import NoFullScreen from '@/icons/no-full-screen.vue'
import { useSongStore } from '@/store'

const ucn = useClassName('player-menu', false)
defineOptions({
  name: 'PlayerMenu',
})

const songStore = useSongStore()

const playerContext = inject(playerContextKey, undefined)

// 全屏或退出全屏
const changeFullScreen = () => {
  playerContext?.changeViwes()
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'player-menu',
  $use-namespace: false
);

@include b() {
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
