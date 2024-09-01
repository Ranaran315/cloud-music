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
      <div class="banner__item" v-for="item of bannerList" :key="item.targetId">
        <router-link to="#">
          <img class="banner__item__img" :src="item.imageUrl" />
          <div
            class="type-title"
            :style="{ '--type-title-color': item.titleColor }"
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

defineOptions({
  name: 'Banner',
})

const bannerList = ref<any[]>([])

async function getBannerList() {
  try {
    const res = (await bannerApi.getBannerList()) as any
    bannerList.value = res.banners
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getBannerList()
})
</script>

<style scoped src="@/style/views/home/banner.scss"></style>
