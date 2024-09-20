<template>
  <cloud-loading :show="loading">
    <div :class="ucn.b()">
      <div :class="ucn.e('card')" v-for="item of data" :key="item.id">
        <div :class="ucn.e('cover')">
          <cloud-image :class="ucn.e('cover-image')" :src="item.picUrl" />
          <div :class="ucn.e('disc')">
            <cloud-image :class="ucn.e('disc-image')" :src="item.picUrl" />
          </div>
        </div>
        <div :class="ucn.e('info')">
          <div :class="ucn.e('name')">{{ item.name }}</div>
          <div :class="ucn.e('artist')">
            {{ formatAlias(item.artists.map((a) => a.name)) }}
          </div>
          <div :class="ucn.e('company')">{{ item.company }}</div>
        </div>
      </div>
    </div>
  </cloud-loading>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { formatAlias } from '@/utils/format'
import { definePropType } from '@/utils/props'
import { Album } from '@/utils/type'

const ucn = useClassName('album-cards')
defineOptions({
  name: 'CloudAlbumCards',
})

defineProps({
  data: definePropType<Album[]>(Array),
  loading: Boolean,
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'album-cards'
);

@mixin info() {
  font-size: 0.8rem;
  color: getTextColor('secondary');
  @include ellipsis();
}

@include b() {
  @include grid($gap: 10px);
  min-height: 200px;
  @include e('card') {
    @include flex(column, center, center);
    $size: 200px;
    width: $size;
    padding: 10px;
    border-radius: getBorderRadius();
    background-color: getFillColor();
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      background-color: getFillColor('secondary');
    }
    @include e('cover') {
      $size: #{$size - 50px};
      position: relative;
      width: $size;
      height: $size;
      padding-right: 30px;
      border-radius: getBorderRadius('small');
      @include e('disc') {
        position: absolute;
        top: 0;
        right: 0;
        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: #000;
        box-shadow: getBoxShadow();
      }
      @include e('cover-image') {
        filter: blur(5px);
        position: relative;
        box-shadow: getBoxShadow();
        transition: z-index 0.3s, filter 0.3s;
      }
    }
    @include e('info') {
      width: 100%;
      @include e('name') {
        font-size: 1rem;
        font-weight: 700;
        @include ellipsis();
      }
      @include e('artist') {
        @include info();
      }
      @include e('company') {
        @include info();
      }
    }
  }
}
</style>
