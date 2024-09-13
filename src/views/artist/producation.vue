<template>
  <cloud-loading :show="show">
    <div :class="ucn.b()" v-html="production"></div>
  </cloud-loading>
</template>

<script setup lang="ts">
import { artistApi } from '@/api'
import { useClassName } from '@/hooks'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const ucn = useClassName('artist-producation', false)
defineOptions({
  name: 'ArtistProducation',
})
const production = ref(null)
const show = ref(false)

const getData = async () => {
  try {
    show.value = true
    let {
      data: { production: result },
    } = await artistApi.getProducation(
      useRoute().params.id as unknown as number
    )
    if (!result) result = '无'
    production.value = result
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
  $block: 'artist-producation',
  $use-namespace: false
);

h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: left;
  color: getTextColor();
}

@include b() {
  color: getTextColor('secondary');
  text-align: left;
  min-height: 200px;
}
</style>
