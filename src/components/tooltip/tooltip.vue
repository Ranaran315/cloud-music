<template>
  <n-tooltip
    :content-class="ucn.b()"
    :arrow-class="ucn.e('arrow')"
    to="#app"
    raw
    :placement="placement"
  >
    <template #trigger>
      <slot />
    </template>
    {{ content }}
  </n-tooltip>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { NTooltip } from 'naive-ui'
import { Placement } from 'naive-ui/es/drawer/src/DrawerBodyWrapper'

const ucn = useClassName('tooltip')

defineOptions({
  name: 'CloudTooltip',
})

defineProps({
  content: String,
  placement: definePropType<Placement>(String),
})
</script>

<style src="@/style/components/tooltip.scss"></style>
