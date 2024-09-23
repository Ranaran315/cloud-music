<template>
  <div :class="ucn.b()">
    <cloud-icon
      :icon="songStore.currentIsLiked ? Liked : Like"
      @click.stop="like"
    />
    <cloud-icon :icon="Comment" />
    <cloud-icon
      @click.stop="playerStore.toggleFullScreen"
      :icon="playerStore.getState().showFullScreen ? NoFullScreen : FullScreen"
    />
    <ToPlaylist />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import ToPlaylist from './to-playlist.vue'
import { Like, Comment, FullScreen, Liked } from '@/icons'
import NoFullScreen from '@/icons/no-full-screen.vue'
import { usePlayerStore, useSongStore } from '@/store'

const ucn = useClassName('player-menu', false)
defineOptions({
  name: 'PlayerMenu',
})

const songStore = useSongStore()
const playerStore = usePlayerStore()

// 喜欢音乐
const like = () => {
  songStore.like(playerStore.getState().currentSongId)
}
</script>

<style lang="scss">
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
