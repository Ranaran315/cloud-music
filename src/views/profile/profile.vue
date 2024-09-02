<template>
  <div>i am user</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()
userStore.getUserInfo()
</script>

<style scoped></style>
