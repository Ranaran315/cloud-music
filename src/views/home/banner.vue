<template>
  <div class="banner">
    <n-carousel autoplay dot-type="line" mousewheel :interval="3000" show-arrow>
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <div class="custom-arrow__prev" @click="prev">
            <ra-icon><Prev /> </ra-icon>
          </div>
          <div class="custom-arrow__next" @click="next">
            <ra-icon><Next /> </ra-icon>
          </div>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index in total"
            :key="index"
            class="custom-dots__item"
            :class="{ active: currentIndex === index - 1 }"
            @mouseenter="to(index - 1)"
          ></li>
        </ul>
      </template>
      <div
        class="banner__item"
        v-for="(item, index) of bannerList"
        :key="item.targetId"
      >
        <router-link to="#">
          <img
            class="banner__item__img"
            :src="item.imageUrl"
            @load="(e) => getImageColor(index, e)"
            crossorigin="anonymous"
          />
          <div
            class="type-title"
            :style="{ '--type-title-color': item.imageColor }"
          >
            {{ item.typeTitle }}
          </div>
        </router-link>
      </div>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { bannerApi } from '@/api'
import { NCarousel } from 'naive-ui'
import { RaIcon } from '@capybara-plus/vue'
import { Prev, Next } from '@/icons'
import { onMounted, ref } from 'vue'
import ColorThief from 'colorthief'
import { rgbToHex } from '@/utils/color'

defineOptions({
  name: 'Banner',
})

const bannerList = ref<any[]>([])

// 获取banner列表
async function getBannerList() {
  try {
    const res = (await bannerApi.getBannerList()) as any
    bannerList.value = res.banners
  } catch (error) {
    console.log(error)
  }
}

// 获取图片主色调
const colorthief = new ColorThief()
async function getImageColor(index: number, e: Event) {
  const result = colorthief.getColor(e.target as HTMLImageElement)
  const resultHex = rgbToHex(result)
  bannerList.value[index].imageColor = resultHex
}

onMounted(() => {
  getBannerList()
})
</script>

<style scoped src="@/style/views/home/banner.scss"></style>
