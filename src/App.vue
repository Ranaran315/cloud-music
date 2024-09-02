<template>
  <Layout />
</template>

<script setup lang="ts">
import Layout from '@/layout/layout.vue'
</script>

<style lang="scss">
body {
  background-color: getFillColor();
}

#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  --navbar-height: 60px;
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
