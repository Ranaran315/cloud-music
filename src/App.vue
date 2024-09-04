<template>
  <Navbar />
  <Sidebar />
  <div class="layout">
    <div class="layout-main"><router-view /></div>
  </div>
  <Player />
</template>

<script setup lang="ts">
import { Navbar, Sidebar, Player } from '@/layout/index.ts'
import { useLoginStore, useSongStore } from '@/store'

useLoginStore().getLoginStatus() // 获取登录状态
useSongStore().getUserLikedSongs() // 获取用户喜欢的歌曲列表
</script>

<style lang="scss">
body {
  background-color: getFillColor();
  box-sizing: border-box;
  overflow-x: hidden;
}

#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  --navbar-height: 60px;
  --sidebar-width: 250px;
  --player-height: 80px;
  --layout-z-index: 1000;
}

.layout {
  margin-top: var(--navbar-height);
  margin-left: var(--sidebar-width);
  margin-bottom: var(--player-height);
  padding: 20px 50px;
  padding-left: 30px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  justify-content: center;
  &-main {
    flex: 1;
    max-width: 1280px;
  }
}

// 滚动条整体
*::-webkit-scrollbar {
  width: 5px;
  &:hover {
    opacity: 0;
  }
}
// 滚动条交接处
*::-webkit-scrollbar-corner {
  background-color: transparent;
}
// 滑块
*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: getColor('primary');
}
// 轨道
*::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
