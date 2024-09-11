<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('cover')">
      <cloud-image :class="ucn.e('cover-image')" :src="data.picUrl" />
    </div>
    <div :class="ucn.e('info')">
      <div :class="ucn.e('name')">{{ data.name }}</div>
      <div :class="ucn.e('artist')">{{ artistName }}</div>
      <div :class="ucn.e('company')">{{ data.company }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { formatAlias } from '@/utils/format'
import { definePropType } from '@/utils/props'
import { Album, Artist } from '@/utils/type'
import { computed } from 'vue'

const ucn = useClassName('album-card')
defineOptions({
  name: 'CloudAlbumCard',
})

const props = defineProps({
  data: {
    type: definePropType<Album>(Object),
    required: true,
  },
})

const artistName = computed(() =>
  formatAlias(props.data.artists.map((item: Artist) => item.name))
)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'album-card'
);

@mixin info() {
  font-size: 0.8rem;
  color: getTextColor('secondary');
  @include ellipsis();
}

@include b() {
  $size: 200px;
  width: $size;
  padding: 10px;
  border-radius: getBorderRadius();
  background-color: getFillColor();
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-sizing: border-box;
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
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: $size;
      height: $size;
      border-radius: 50%;
      background-color: #000;
    }
    @include e('cover-image') {
      position: relative;
      z-index: 1;
      box-shadow: getBoxShadow();
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
</style>
