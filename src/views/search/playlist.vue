<template>
  <cloud-playlist-cards
    :show="searchContext?.state.loading"
    :data="data"
  ></cloud-playlist-cards>
</template>

<script setup lang="ts">
import { SearchContextKey } from './context'
import { inject, ref, watchEffect } from 'vue'
import { playlistApi } from '@/api'
import { Playlist } from '@/utils/type'

defineOptions({
  name: 'SearchPlaylist',
})

const data = ref<Playlist[]>([])
const searchContext = inject(SearchContextKey, undefined)
watchEffect(async () => {
  try {
    searchContext?.setLoading(true)
    data.value = []
    const ids = searchContext?.state.result?.playlists?.map?.(
      (item: any) => item.id
    )
    if (ids) {
      await Promise.all(
        ids.map(async (id: number) => {
          const { playlist } = await playlistApi.getPlaylistDetail(id)
          data.value.push(playlist)
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
