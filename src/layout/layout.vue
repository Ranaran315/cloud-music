<template>
  <Navbar />
  <div class="layout"></div>
</template>

<script setup lang="ts">
import Navbar from './navbar/navbar.vue'
</script>

<style scoped>
.layout {
  margin-top: var(--navbar-height);
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
}
</style>
