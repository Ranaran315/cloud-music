<template>
  <div :class="ucn.b()">
    <cloud-artist-cards :loading="loading" :data="data"></cloud-artist-cards>
  </div>
</template>

<script setup lang="ts">
import { artistApi } from '@/api'
import { useClassName } from '@/hooks'
import { Artist } from '@/utils/type'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const ucn = useClassName('artist-simi', false)
defineOptions({
  name: 'ArtistSimi',
})

const data = ref<Artist[]>([])
const loading = ref(false)
const getData = async () => {
  try {
    loading.value = true
    const { artists } = await artistApi.getSimi(
      useRoute().params.id as unknown as number
    )
    data.value = artists
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
getData()
</script>

<style scoped lang="scss"></style>
