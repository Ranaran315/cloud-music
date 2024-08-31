<template>
  <ra-button :class="[ucn.b(), ucn.m(type)]" :shape="shape">
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
  shape: {
    type: definePropType<ButtonProps['shape']>(String),
  },
})
</script>

<style scoped lang="scss" src="@/style/components/button.scss"></style>
