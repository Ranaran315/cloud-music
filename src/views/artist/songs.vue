<template>
  <cloud-songlist
    :class="ucn.b()"
    :data="songs"
    :loading="show"
  ></cloud-songlist>
</template>

<script setup lang="ts">
import { artistApi, songApi } from '@/api'
import { useClassName } from '@/hooks'
import { Song } from '@/utils/type'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const ucn = useClassName('artist-songs', false)
defineOptions({
  name: 'ArtistSongs',
})
const songs = ref([])
const show = ref(false)
const getData = async () => {
  try {
    show.value = true
    let { songs: result } = await artistApi.getSongs(
      useRoute().params.id as unknown as number
    )
    const ids = result.map((item: Song) => item.id)
    ;({ songs: result } = await songApi.getSongDetail(ids))
    songs.value = result
  } catch (error) {
    console.log(error)
  } finally {
    show.value = false
  }
}
getData()
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'artist-songs',
  $use-namespace: false
);
</style>
