<template>
  <cloud-album-cards :data="data" :loading="loading"></cloud-album-cards>
</template>

<script setup lang="ts">
import { artistApi } from '@/api'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'ArtistAlbums',
})

const data = ref([])
const loading = ref(false)

const getData = async () => {
  try {
    loading.value = true
    const { hotAlbums } = await artistApi.getAlbums(
      useRoute().params.id as unknown as number
    )
    data.value = hotAlbums
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

getData()
</script>
