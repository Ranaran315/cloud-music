<template>
  <div :class="ucn.b()">
    <ra-icon>
      <Like />
    </ra-icon>
    <ra-icon>
      <Comment />
    </ra-icon>
    <ToPlaylist />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import ToPlaylist from './to-playlist.vue'
import { RaIcon } from '@capybara-plus/vue'
import { Like, Comment } from '@/icons'

const ucn = useClassName('player-menu', false)
defineOptions({
  name: 'PlayerMenu',
})
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
