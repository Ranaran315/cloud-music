<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('artist')" v-for="item of artists" :key="item.id">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'
import { useClassName } from '@/hooks'
import { formatAlias } from '@/utils/format'

const ucn = useClassName('search-artists', false)
defineOptions({
  name: 'SearchArtists',
})
const searchContext = inject(SearchContextKey, undefined)
/**
 * id: 歌手id
 * name: 歌手名
 * picUrl: 歌手图片
 * alias(string[]): 歌手别名
 * albumSize: 专辑数量
 * mvSize: mv数量
 * followed: 是否关注
 * identityIconUrl：认证图标
 */
const artists = computed(() => searchContext?.state.result?.artists)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'search-artists',
  $use-namespace: false
);

@include b() {
  $size: 200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(#{$size * 2}, 1fr));
  gap: 20px;
  @include e('artist') {
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
}
</style>
