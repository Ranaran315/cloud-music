<template>
  <ra-input
    :class="ucn.b()"
    v-model="modelValue"
    :placeholder="placeholder"
    clearable
  ></ra-input>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaInput } from '@capybara-plus/vue'

const ucn = useClassName('input')
defineOptions({
  name: 'CloudInput',
})

defineProps({
  placeholder: String,
})

const modelValue = defineModel({
  type: String,
  required: true,
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'input'
);

@include b() {
  &:hover {
    outline-color: getColor('primary') !important;
  }
  &:focus-within {
    outline-color: getColor('primary') !important;
  }
}
</style>
