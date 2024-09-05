<template>
  <n-spin :show="show" :content-class="ucn.b()">
    <slot />
  </n-spin>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { NSpin } from 'naive-ui'

const ucn = useClassName('loading')
defineOptions({
  name: 'CloudLoading',
})

defineProps({
  show: Boolean,
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'loading'
);

:deep(.n-spin) {
  color: getTextColor();
}
</style>
