<template>
  <cloud-playlist-cards
    :loading="searchContext?.state.loading"
    :data="data"
  ></cloud-playlist-cards>
</template>

<script setup lang="ts">
import { SearchContextKey } from './context'
import { inject, ref, watchEffect } from 'vue'
import { playlistApi } from '@/api'
import { Playlist } from '@/utils/type'
import { useAsyncTryCatch } from '@/utils/async'

defineOptions({
  name: 'SearchPlaylist',
})

const data = ref<Playlist[]>([])
const searchContext = inject(SearchContextKey, undefined)
watchEffect(async () => {
  useAsyncTryCatch(
    async () => {
      searchContext?.setLoading(true)
      data.value = []
      const ids = searchContext?.state.result?.playlists?.map?.(
        (item: any) => item.id
      )
      if (ids) {
        const result = await Promise.all(
          ids.map((id: number) => {
            return playlistApi.getPlaylistDetail(id)
          })
        )
        data.value = result.map((item) => item.playlist)
      }
    },
    null,
    () => {
      searchContext?.setLoading(false)
    }
  )
})
</script>
