<template>
  <template v-if="loading">
    <slot name="skeleton">
      <div :class="ucn.b()">
        <SkeletonItem></SkeletonItem>
        <div :class="ucn.e('container')">
          <SkeletonItem type="circle" size="50"></SkeletonItem>
          <div :class="ucn.e('right')">
            <SkeletonItem type="line" size="10"></SkeletonItem>
            <SkeletonItem type="line" size="10"></SkeletonItem>
            <div :class="ucn.e('right-bottom')">
              <SkeletonItem type="line" size="10"></SkeletonItem>
              <SkeletonItem type="line" size="10"></SkeletonItem>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import SkeletonItem from './skeleton-item.vue'

const ucn = useClassName('skeleton')
defineOptions({
  name: 'CloudSkeleton',
})

defineProps({
  loading: Boolean,
  to: {
    type: String,
    default: 'body',
  },
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'skeleton'
);

@include b() {
  @include flex(column);
  width: 200px;
  @include e('container') {
    @include flex();
    @include e('right') {
      @include flex(column);
      flex: 1;
      margin-left: 10px;
      @include e('right-bottom') {
        @include flex();
      }
    }
  }
}
</style>
