<template>
  <cloud-songlist :class="ucn.b()" :data="songs"></cloud-songlist>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { Song } from '@/utils/interface'

const ucn = useClassName('artist-songs', false)
defineOptions({
  name: 'ArtistSongs',
})

defineProps({
  songs: {
    type: definePropType<Array<Song>>(Array),
    default: [],
  },
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'artist-songs',
  $use-namespace: false
);
</style>
