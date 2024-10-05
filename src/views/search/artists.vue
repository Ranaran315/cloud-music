<template>
  <cloud-artist-cards
    :loading="searchContext?.state.type[SearchType.Artists]"
    :data="data"
  ></cloud-artist-cards>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'
import { SearchType } from '@/utils/interface'

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
const data = computed(() => searchContext?.state.result?.artists)
</script>
