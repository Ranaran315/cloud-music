<template>
  <div :class="ucn.b()">
    <PlayerViwes />
    <Controller />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import PlayerViwes from './viwes.vue'
import Controller from './controller.vue'

const ucn = useClassName('player', false)
defineOptions({
  name: 'Player',
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'player',
  $use-namespace: false
);

@include b() {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: getZIndex('layout');
}
</style>
