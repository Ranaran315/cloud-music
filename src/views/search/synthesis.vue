<template>
  <div :class="ucn.b()">
    <SearchSynthesisItem title="歌曲" @more="handleMore(SearchType.Songs)">
      <cloud-song-cards
        :data="songs"
        :loading="searchContext?.state.type[SearchType.Synthesis]"
      />
    </SearchSynthesisItem>
    <SearchSynthesisItem title="歌手" @more="handleMore(SearchType.Artists)">
      <cloud-artist-cards
        :data="artists"
        :loading="searchContext?.state.type[SearchType.Synthesis]"
      />
    </SearchSynthesisItem>
    <SearchSynthesisItem title="歌单" @more="handleMore(SearchType.Playlist)">
      <cloud-playlist-cards
        :data="playlists"
        :loading="searchContext?.state.type[SearchType.Synthesis]"
      />
    </SearchSynthesisItem>
    <SearchSynthesisItem title="专辑" @more="handleMore(SearchType.Album)">
      <cloud-album-cards
        :data="albums"
        :loading="searchContext?.state.type[SearchType.Synthesis]"
      />
    </SearchSynthesisItem>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'
import { SearchType, Song } from '@/utils/interface'
import SearchSynthesisItem from './synthesis-item.vue'

const ucn = useClassName('synthesis', false)
defineOptions({
  name: 'Synthesis',
})

const searchContext = inject(SearchContextKey, undefined)
const songs = computed<Song[]>(() => searchContext?.state.result.song?.songs)
const artists = computed(() => searchContext?.state.result.artist?.artists)
const playlists = computed(
  () => searchContext?.state.result.playList?.playLists
)
const albums = computed(() => searchContext?.state.result.album?.albums)

const handleMore = (type: SearchType) => {
  searchContext?.changeTab(type)
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'synthesis', $use-namespace: false);

@include b() {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
}
</style>
