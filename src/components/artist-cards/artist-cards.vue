<template>
  <cloud-loading :show="loading">
    <div :class="ucn.b()">
      <router-link
        v-for="item of data"
        :key="item.id"
        :to="`/artist/${item.id}`"
        :class="ucn.e('card')"
      >
        <div :class="ucn.e('cover')">
          <cloud-image :src="item.picUrl" width="100%"></cloud-image>
        </div>
        <div :class="ucn.e('info')">
          <div :class="ucn.e('name')">
            {{ item.name
            }}<cloud-image
              :src="item.identityIconUrl"
              :class="ucn.e('identity')"
            ></cloud-image>
          </div>
          <div :class="ucn.e('alias')" v-if="item.alias?.length">
            {{ formatAlias(item.alias) }}
          </div>
          <div :class="ucn.e('count')">
            <span>{{ item.albumSize }}专辑</span>
            <span>{{ item.mvSize }}MV</span>
          </div>
        </div>
      </router-link>
    </div>
  </cloud-loading>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { Artist } from '@/utils/type'
import { formatAlias } from '@/utils/format'

const ucn = useClassName('artist-cards')
defineOptions({
  name: 'CloudArtistCards',
})

defineProps({
  data: definePropType<Artist[]>(Array),
  loading: Boolean,
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'artist-cards');

@include b() {
  $size: 200px;
  @include grid() {
    grid-template-columns: repeat(auto-fill, minmax(#{$size * 2}, 1fr));
  }
  min-height: $size;
  @include e('card') {
    @include flex($align: center) {
      column-gap: 20px;
      row-gap: 40px;
      padding: 10px 20px;
    }
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
      @include flex(column);
      max-width: $size;
      @include e('name') {
        @include flex() {
          width: fit-content;
        }
        $identity-size: 20px;
        font-size: 1.1rem;
        font-weight: 700;
        position: relative;
        padding-right: #{$identity-size + 10px};
        @include ellipsis();
        @include e('identity') {
          width: $identity-size;
          height: $identity-size;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      @include e('alias') {
        @include ellipsis;
        font-size: 0.85rem;
        color: getTextColor('secondary');
      }
      @include e('count') {
        @include flex();
        @include ellipsis;
        font-size: 0.85rem;
        color: getTextColor('secondary');
      }
    }
  }
}
</style>
