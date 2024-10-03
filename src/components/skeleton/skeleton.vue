<template>
  <template v-if="show">
    <slot name="skeleton">
      <div :class="ucn.b()" v-for="i of count" :key="i">
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
  /**
   * @description 是否显示骨架屏
   */
  show: Boolean,
  /**
   * @description 默认的骨架屏的数量
   */
  count: {
    type: Number,
    default: 1,
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
