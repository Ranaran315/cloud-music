<template>
  <Navbar />
  <Sidebar />
  <div class="layout"></div>
</template>

<script setup lang="ts">
import Navbar from './navbar/navbar.vue'
import Sidebar from './sidebar/sidebar.vue'
</script>

<style scoped>
.layout {
  margin-top: var(--navbar-height);
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
}
</style>
