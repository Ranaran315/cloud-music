<template>
  <cloud-button type="play" v-model="isPlay"></cloud-button>
  <div class="logo">
    <ra-icon size="10rem">
      <Search />
    </ra-icon>
  </div>
  <cloud-search v-model="keywords" @keydown.enter="search"></cloud-search>
</template>

<script setup lang="ts">
import { RaIcon } from '@capybara-plus/vue'
import { Search } from './icons'
import { ref } from 'vue'
import searchApi from '@/api/search'

const isPlay = ref(false)

const keywords = ref('')

const search = async () => {
  const res = await searchApi.search({
    keywords: keywords.value,
  })
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
