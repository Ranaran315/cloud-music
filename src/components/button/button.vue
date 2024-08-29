<template>
  <ra-button :class="[ucn.b(), ucn.m(type)]" shape="round">
    <template v-if="type == 'play'">
      <ra-icon>
        <Play />
      </ra-icon>
    </template>
    <slot></slot>
  </ra-button>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon, RaButton } from '@capybara-plus/vue'
import { Play } from '@/icons'
import { definePropType } from '@/utils/props'

const ucn = useClassName('button')

defineOptions({
  name: 'CloudButton',
})

interface CloudButtonConsts {
  type: 'default' | 'primary' | 'play'
}

defineProps({
  type: {
    type: definePropType<CloudButtonConsts['type']>(String),
    default: 'default',
  },
})
</script>

<style scoped lang="scss" src="@/style/components/button.scss"></style>
