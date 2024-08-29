<template>
  <h1>Hello World</h1>
  <a href="#">1111111111</a>
  <ul>
    <li>1</li>
    <li>2</li>
  </ul>
  <button @click="handleClick">点击</button>
  <button @click="handleClick2">检查登录状态</button>
  <img :src="qrImg" alt="" />
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store'
import { computed } from 'vue'

const loginStore = useLoginStore()
const qrImg = computed(() => loginStore.qrImg)
const handleClick = async () => {
  loginStore.getQRCode()
}
const handleClick2 = async () => {
  loginStore.getLoginStatus()
}
</script>

<style scoped></style>
