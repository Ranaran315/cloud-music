<template>
  <div :class="ucn.b()">
    <cloud-button type="primary" shape="circle">
      <ra-icon>
        <Skin />
      </ra-icon>
    </cloud-button>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon } from '@capybara-plus/vue'
import { Skin } from '@/icons'

const ucn = useClassName('skin')

defineOptions({
  name: 'CloudSkin',
})
</script>

<style scoped src="@/style/components/navbar/skin.scss"></style>
