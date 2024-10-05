<template>
  <div :class="ucn.b()">
    <cloud-skeleton :show="loading" :count="5">
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
    </cloud-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { formatAlias } from '@/utils/format'
import { definePropType } from '@/utils/props'
import { Album } from '@/utils/interface'

const ucn = useClassName('album-cards')
defineOptions({
  name: 'CloudAlbumCards',
})

defineProps({
  data: definePropType<Album[]>(Array),
  loading: Boolean,
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'album-cards'
);

$keyframes: album-cards-rotate;

@mixin info() {
  font-size: 0.8rem;
  color: getTextColor('secondary');
  @include ellipsis();
}

@include b() {
  @include grid($gap: 10px, $minmax: 300px);
  min-height: 200px;
  @include e('card') {
    @include flex(column, center, center);
    $size: 200px;
    $disc-size: ($size - 60px);
    width: calc(#{$size} + 100px);
    padding: 10px;
    border-radius: getBorderRadius();
    background-color: getFillColor();
    transition: background-color 0.3s;
    cursor: pointer;
    &:hover {
      @include e('cover') {
        padding-right: ($disc-size - 20px);
      }
      @include e('disc') {
        animation-play-state: running !important;
      }
    }
    @include e('cover') {
      $size: #{$size - 50px};
      position: relative;
      width: $size;
      height: $size;
      padding-right: 30px;
      border-radius: getBorderRadius('small');
      transition: padding-right 0.3s;
      @include e('cover-image') {
        position: relative;
        z-index: 1;
        box-shadow: getBoxShadow();
      }
      @include e('disc') {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: $disc-size;
        height: $disc-size;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: #000;
        transition: filter 0.3s;
        animation: $keyframes 5s linear infinite;
        animation-play-state: paused;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20%;
          height: 20%;
          background-color: getFillColor();
          border: 1px solid #000;
          border-radius: 50%;
        }
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

@keyframes #{$keyframes} {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
