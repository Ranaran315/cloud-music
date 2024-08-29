<template>
  <cloud-button type="play" v-model="isPlay"></cloud-button>
  <div class="logo">
    <ra-icon size="10rem">
      <Search />
    </ra-icon>
  </div>
</template>

<script setup lang="ts">
import { RaIcon } from '@capybara-plus/vue'
import { Search } from './icons'
import { ref } from 'vue'

const isPlay = ref(false)
</script>

<style scoped>
.logo {
  width: 60px;
  height: 60px;
  color: #ff0000;
}
</style>
