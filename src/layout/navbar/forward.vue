<template>
  <cloud-button
    type="primary"
    shape="circle"
    size="medium"
    :icon="Forward"
    @click="$router.forward()"
  >
  </cloud-button>
</template>

<script setup lang="ts">
import { Forward } from '@/icons'
</script>
