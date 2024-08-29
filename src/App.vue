<template>
  <cloud-button type="primary">播放全部</cloud-button>
  <div class="logo">
    <ra-icon size="10rem">
      <LogoWithName />
    </ra-icon>
  </div>
</template>

<script setup lang="ts">
import { RaIcon } from '@capybara-plus/vue'
import { LogoWithName } from './icons'
</script>

<style scoped>
.logo {
  width: 60px;
  height: 60px;
  color: #ff0000;
}
</style>
