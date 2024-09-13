<template>
  <div :class="ucn.b()">
    <cloud-button
      type="primary"
      shape="circle"
      size="medium"
      :icon="Back"
      @click="$router.back()"
    >
    </cloud-button>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { Back } from '@/icons'

const ucn = useClassName('navbar-back', false)
defineOptions({
  name: 'NavbarBack',
})
</script>

<style scoped lang="scss"></style>
