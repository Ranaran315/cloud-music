<template>
  <cloud-songlist
    :data="songs"
    :loading="searchContext?.state.loading"
  ></cloud-songlist>
</template>

<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import { SearchContextKey } from './context'
import { songApi } from '@/api'

const searchContext = inject(SearchContextKey, undefined)
const songs = ref<any[]>([])
watchEffect(async () => {
  try {
    searchContext?.setLoading(true)
    const songIds: number[] = searchContext?.state.result?.songs?.map?.(
      (item: any) => item.id
    )
    if (songIds) {
      songs.value = (await songApi.getSongDetail(songIds)).songs
    }
  } catch (error) {
    console.log(error)
  } finally {
    searchContext?.setLoading(false)
  }
})
watchEffect(() => {
  if (searchContext?.state.loading) {
    songs.value = []
  }
})
</script>
