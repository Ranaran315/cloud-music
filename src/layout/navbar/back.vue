<template>
  <cloud-button
    type="primary"
    shape="circle"
    size="medium"
    :icon="Back"
    @click="$router.back()"
  >
  </cloud-button>
</template>

<script setup lang="ts">
import { Back } from '@/icons'
</script>
