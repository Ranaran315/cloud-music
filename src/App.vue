<template>
  <h1>Hello World</h1>
  <a href="#">1111111111</a>
  <ul>
    <li>1</li>
    <li>2</li>
  </ul>
  <button @click="handleClick">点击</button>
  <img :src="qrImg" alt="" />
</template>

<script setup lang="ts">
import loginApi from '@/api/login'
import { ref } from 'vue'

const qrImg = ref('')

const handleClick = async () => {
  try {
    const { unikey } = (await loginApi.getKey()) as any
    const { qrimg } = (await loginApi.getQR(unikey, true)) as any
    qrImg.value = qrimg
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
