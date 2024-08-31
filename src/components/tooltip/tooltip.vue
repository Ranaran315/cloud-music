<template>
  <n-tooltip
    :content-class="ucn.b()"
    :arrow-class="ucn.e('arrow')"
    to="#app"
    raw
  >
    <template #trigger>
      <slot />
    </template>
    {{ content }}
  </n-tooltip>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { NTooltip } from 'naive-ui'

const ucn = useClassName('tooltip')

defineOptions({
  name: 'CloudTooltip',
})

defineProps({
  content: String,
})
</script>

<style src="@/style/components/tooltip.scss"></style>
