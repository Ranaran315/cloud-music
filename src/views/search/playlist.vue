<template>
  <cloud-loading :show="searchContext?.state.loading">
    <div :class="ucn.b()">
      <cloud-playlist-card
        v-for="item of playlists"
        :key="item.id"
        :data="item"
      ></cloud-playlist-card>
    </div>
  </cloud-loading>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { SearchContextKey } from './context'
import { inject, ref, watchEffect } from 'vue'
import { playlistApi } from '@/api'
import { Playlist } from '@/utils/type'

const ucn = useClassName('search-playlist', false)
defineOptions({
  name: 'SearchPlaylist',
})

const playlists = ref<Playlist[]>([])
const searchContext = inject(SearchContextKey, undefined)
watchEffect(async () => {
  try {
    searchContext?.setLoading(true)
    playlists.value = []
    const ids = searchContext?.state.result?.playlists?.map?.(
      (item: any) => item.id
    )
    if (ids) {
      await Promise.all(
        ids.map(async (id: number) => {
          const { playlist } = await playlistApi.getPlaylistDetail(id)
          playlists.value.push(playlist)
        })
      )
    }
  } catch (error) {
    console.log(error)
  } finally {
    searchContext?.setLoading(false)
  }
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'search-playlist',
  $use-namespace: false
);

@include b() {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  min-height: 200px;
}
</style>
