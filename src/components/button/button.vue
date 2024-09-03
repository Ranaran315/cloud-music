<template>
  <ra-button
    :class="[ucn.b(), ucn.m(type)]"
    :shape="shape"
    :size="size"
    :loading="loading"
  >
    <template v-if="icon">
      <ra-icon>
        <component :is="icon" />
      </ra-icon>
    </template>
    <slot></slot>
  </ra-button>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaButton, RaIcon, type ButtonProps } from '@capybara-plus/vue'
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
  icon: Object,
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'button'
);

@mixin button($bc, $color: getTextColor()) {
  background-color: $bc;
  color: $color;

  &:hover:not(:disabled) {
    background-color: rgba($color: $bc, $alpha: 0.85);
  }
}
@include b() {
  transition: transform 0.3s, box-shadow 0.7s;
  border-radius: 20px;
  @include button(getColor());
  &:active:not(:disabled) {
    transform: scale(1) translateY(4px);
    box-shadow: inset 0 5px 5px 0px getTextColor();
  }
}

@include m('primary') {
  @include button(getColor('primary'), getFillColor());
}

.ra-button--circle {
  border-radius: 50% !important;
}
</style>
