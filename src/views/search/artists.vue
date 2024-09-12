<template>
  <cloud-loading :show="searchContext?.state.loading">
    <div :class="ucn.b()">
      <cloud-artist-card
        v-for="item of artists"
        :key="item.id"
        :data="item"
      ></cloud-artist-card>
    </div>
  </cloud-loading>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'
import { useClassName } from '@/hooks'

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  min-height: 200px;
}
</style>
