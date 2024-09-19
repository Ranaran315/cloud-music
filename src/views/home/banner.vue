<template>
  <div class="banner">
    <n-carousel autoplay dot-type="line" :interval="3000" show-arrow>
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
        v-for="(item, index) of bannerList.filter((item) => item.adid == null)"
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
import { ref } from 'vue'
import ColorThief from 'colorthief'
import { rgbToHex } from '@/utils/color'
import { useAsyncTryCatch } from '@/utils/async'

defineOptions({
  name: 'Banner',
})

const bannerList = ref<any[]>([])

// 获取banner列表
async function getBannerList() {
  useAsyncTryCatch(async () => {
    const res = (await bannerApi.getBannerList()) as any
    bannerList.value = res.banners
  })
}
getBannerList()

// 获取图片主色调
const colorthief = new ColorThief()
async function getImageColor(index: number, e: Event) {
  const result = colorthief.getColor(e.target as HTMLImageElement)
  const resultHex = rgbToHex(result)
  bannerList.value[index].imageColor = resultHex
}
</script>

<style scoped lang="scss">
.banner {
  cursor: pointer;
  &:hover {
    .custom-arrow,
    .custom-dots,
    .type-title {
      opacity: 1;
    }
  }
  .custom-arrow {
    opacity: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    pointer-events: none;
    transition: opacity 0.3s;
    &__prev,
    &__next {
      font-size: 4rem;
      width: fit-content;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: all;
      &:hover {
        color: getColor('primary');
      }
    }
  }
  .custom-dots {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    &__item {
      width: 25px;
      height: 4px;
      border-radius: 25px;
      background-color: getFillColor();
      cursor: pointer;
      transition: background-color 0.3s;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:hover {
        background-color: getColor('primary');
      }
      &.active {
        width: 50px;
        background-color: getColor('primary');
      }
    }
  }
  &__item {
    &__img {
      width: 100%;
      object-fit: cover;
    }
    .type-title {
      opacity: 0;
      position: absolute;
      bottom: 20px;
      left: 20px;
      letter-spacing: 0.1rem;
      font-weight: 700;
      text-align: center;
      color: var(--type-title-color);
      background-color: #fff;
      padding: 5px 10px;
      border-radius: 8px;
      z-index: 1;
    }
  }
}
</style>
