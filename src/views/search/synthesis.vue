<template>
  <div :class="ucn.b()">
    <SearchSynthesisItem title="歌曲" @more="handleMore(SearchType.Songs)">
      <div :class="ucn.e('song-wrapper')">
        <cloud-song-card v-for="item of songs" :key="item.id" :data="item" />
      </div>
    </SearchSynthesisItem>
    <SearchSynthesisItem title="歌手" @more="handleMore(SearchType.Artists)">
      <div :class="ucn.e('artist-wrapper')">
        <cloud-artist-card
          v-for="item of artists"
          :key="item.id"
          :data="item"
        />
      </div>
    </SearchSynthesisItem>
    <SearchSynthesisItem title="歌单" @more="handleMore(SearchType.Playlist)">
      <div :class="ucn.e('playlist-wrapper')">
        <cloud-playlist-card
          v-for="item of playlists"
          :key="item.id"
          :data="item"
        />
      </div>
    </SearchSynthesisItem>
    <SearchSynthesisItem title="专辑" @more="handleMore(SearchType.Album)">
      <div :class="ucn.e('album-wrapper')">
        <cloud-album-card v-for="item of albums" :key="item.id" :data="item" />
      </div>
    </SearchSynthesisItem>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'
import { SearchType, Song } from '@/utils/type'
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

@mixin grid() {
  width: 100%;
  display: grid;
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
  @content;
}

@include b() {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
  @include e('song-wrapper') {
    @include grid() {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      column-gap: 20px;
      row-gap: 30px;
    }
  }
  @include e('artist-wrapper') {
    @include grid() {
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
  }
  @include e('playlist-wrapper') {
    @include grid() {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
  @include e('album-wrapper') {
    @include grid() {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
}
</style>
