<template>
  <div :class="ucn.b()">
    <cloud-button type="primary" shape="circle" size="medium">
      <ra-icon size="1.5rem">
        <Skin />
      </ra-icon>
    </cloud-button>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon } from '@capybara-plus/vue'
import { Skin } from '@/icons'

const ucn = useClassName('navbar-skin', false)

defineOptions({
  name: 'NavbarSkin',
})
</script>

<style scoped></style>
