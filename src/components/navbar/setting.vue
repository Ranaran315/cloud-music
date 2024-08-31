<template>
  <div :class="ucn.b()">
    <cloud-button type="primary" shape="circle" size="medium">
      <ra-icon size="1.5rem">
        <Setting />
      </ra-icon>
    </cloud-button>
  </div>
</template>

<script setup lang="ts">
import { RaIcon } from '@capybara-plus/vue'
import { Setting } from '@/icons'
import { useClassName } from '@/hooks'

const ucn = useClassName('setting')

defineOptions({
  name: 'CloudSetting',
})
</script>

<style scoped src="@/style/components/navbar/setting.scss"></style>
