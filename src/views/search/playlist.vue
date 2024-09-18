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
import { useTryCatch } from '@/utils/error'

defineOptions({
  name: 'SearchPlaylist',
})

const data = ref<Playlist[]>([])
const searchContext = inject(SearchContextKey, undefined)
watchEffect(async () => {
  useTryCatch(
    async () => {
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
    },
    null,
    () => {
      searchContext?.setLoading(false)
    }
  )
})
</script>
