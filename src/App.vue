<template>
  <cloud-navbar></cloud-navbar>
  <cloud-button class="test" type="primary" @click="handleClick"
    >点击</cloud-button
  >
</template>

<script setup lang="ts">
// import bannerApi from '@/api/banner'
import { useLogin } from '@/components'

const handleClick = async () => {
  useLogin()
}
</script>

<style scoped>
.test {
  margin: 20px;
}
</style>
