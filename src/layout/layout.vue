<template>
  <div :class="ucn.b()">
    <Navbar />
    <Sidebar />
    <div :class="ucn.e('main')">
      <router-view />
    </div>
    <Player />
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { Navbar, Sidebar, Player } from '@/layout/index.ts'
import { useLoginStore, useSongStore } from '@/store'

useLoginStore().getLoginStatus() // 获取登录状态
useSongStore().getUserLikedSongs() // 获取用户喜欢的歌曲列表

const ucn = useClassName('layout', false)
defineOptions({
  name: 'Layout',
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'layout',
  $use-namespace: false
);

@include b() {
  --navbar-height: 60px;
  --sidebar-width: 250px;
  --player-controller-height: 80px;
  --layout-z-index: 1000;
  --tab-nav-z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @include e('main') {
    margin-top: var(--navbar-height);
    margin-left: var(--sidebar-width);
    margin-bottom: var(--player-controller-height);
    padding: 20px 50px;
    padding-left: 30px;
    box-sizing: border-box;
    flex: 1;
    max-width: 1280px;
  }
}
</style>
