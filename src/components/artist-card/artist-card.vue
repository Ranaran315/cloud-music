<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('cover')">
      <cloud-image :src="data.picUrl" width="100%"></cloud-image>
    </div>
    <div :class="ucn.e('info')">
      <div :class="ucn.e('name')">
        {{ data.name
        }}<cloud-image
          :src="data.identityIconUrl"
          :class="ucn.e('identity')"
        ></cloud-image>
      </div>
      <div :class="ucn.e('alias')" v-if="data.alias?.length">
        {{ formatAlias(data.alias) }}
      </div>
      <div :class="ucn.e('count')">
        <span>{{ data.albumSize }}专辑</span>
        <span>{{ data.mvSize }}MV</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { Artist } from '@/utils/type'
import { formatAlias } from '@/utils/format'

const ucn = useClassName('artist-card')
defineOptions({
  name: 'CloudArtistCard',
})

defineProps({
  data: {
    type: definePropType<Artist>(Object),
    required: true,
  },
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'artist-card');

@include b() {
  $size: 200px;
  display: flex;
  align-items: center;
  column-gap: 20px;
  row-gap: 40px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: getFillColor('secondary');
  }
  @include e('cover') {
    width: $size;
    height: $size;
    border-radius: 50%;
    box-shadow: getBoxShadow();
  }
  @include e('info') {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    max-width: $size;
    @include e('name') {
      $identity-size: 20px;
      font-size: 1.1rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      position: relative;
      padding-right: #{$identity-size + 10px};
      @include ellipsis;
      @include e('identity') {
        width: $identity-size;
        height: $identity-size;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    @include e('alias') {
      font-size: 0.85rem;
      color: getTextColor('secondary');
      @include ellipsis;
    }
    @include e('count') {
      font-size: 0.85rem;
      color: getTextColor('secondary');
      display: flex;
      gap: 10px;
      @include ellipsis;
    }
  }
}
</style>
