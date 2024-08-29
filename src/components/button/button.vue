<template>
  <ra-button
    :class="[ucn.b(), ucn.m(type)]"
    :shape="shape"
    @click="handleClick"
  >
    <template v-if="type == 'play'">
      <ra-icon>
        <component :is="modelValue ? Stop : Play"></component>
      </ra-icon>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </ra-button>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon, RaButton } from '@capybara-plus/vue'
import { Play, Stop } from '@/icons'
import { definePropType } from '@/utils/props'
import { computed } from 'vue'

const ucn = useClassName('button')

defineOptions({
  name: 'CloudButton',
})

interface CloudButtonConsts {
  type: 'default' | 'primary' | 'play'
}
const props = defineProps({
  type: {
    type: definePropType<CloudButtonConsts['type']>(String),
    default: 'default',
  },
  modelValue: Boolean,
})
const emit = defineEmits({
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
})

const handleClick = () => {
  emit('update:modelValue', !props.modelValue)
}

const shape = computed(() => {
  if (props.type === 'play') {
    return 'circle'
  }
  return 'round'
})
</script>

<style scoped lang="scss" src="@/style/components/button.scss"></style>
