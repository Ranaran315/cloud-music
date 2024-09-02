<template>
  <div :class="ucn.b()">
    <cloud-button type="primary" shape="circle" size="medium">
      <ra-icon size="1.5rem">
        <Message />
      </ra-icon>
    </cloud-button>
  </div>
</template>

<script setup lang="ts">
import { RaIcon } from '@capybara-plus/vue'
import { Message } from '@/icons'
import { useClassName } from '@/hooks'

const ucn = useClassName('navbar-message', false)

defineOptions({
  name: 'NavbarMessage',
})
</script>

<style scoped lang="scss"></style>
