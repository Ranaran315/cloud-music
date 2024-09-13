<template>
  <div :class="ucn.b()">
    <cloud-button type="primary" shape="circle" size="medium" :icon="Setting">
    </cloud-button>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@/icons'
import { useClassName } from '@/hooks'

const ucn = useClassName('navbar-setting', false)

defineOptions({
  name: 'NavbarSetting',
})
</script>

<style scoped></style>
