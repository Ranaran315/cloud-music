<template>
  <ra-button
    :class="[ucn.b(), ucn.m(type)]"
    :shape="shape"
    :size="size"
    :loading="loading"
  >
    <slot></slot>
  </ra-button>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaButton, type ButtonProps } from '@capybara-plus/vue'
import { definePropType } from '@/utils/props'

const ucn = useClassName('button')

defineOptions({
  name: 'CloudButton',
})

interface CloudButtonConsts {
  type: 'default' | 'primary'
}
defineProps({
  type: {
    type: definePropType<CloudButtonConsts['type']>(String),
    default: 'default',
  },
  shape: definePropType<ButtonProps['shape']>(String),
  size: definePropType<ButtonProps['size']>(String),
  loading: Boolean,
})
</script>

<style scoped lang="scss" src="@/style/components/button.scss"></style>
