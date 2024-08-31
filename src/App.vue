<template>
  <cloud-button
    @click="handleClick"
    type="play"
    v-model="isPlay"
  ></cloud-button>
  <div class="logo">
    <ra-icon size="2rem">
      <Message />
    </ra-icon>
  </div>
  <cloud-navbar></cloud-navbar>
</template>

<script setup lang="ts">
import { RaIcon } from '@capybara-plus/vue'
import { Message } from './icons'
import { ref } from 'vue'
import bannerApi from '@/api/banner'

const isPlay = ref(false)

const handleClick = async () => {
  const res = await bannerApi.getIcon()
  console.log(res)
}
</script>

<style scoped>
.logo {
  width: 60px;
  height: 60px;
  color: #ff0000;
}
</style>
