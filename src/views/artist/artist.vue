<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('header')">
      <div :class="ucn.e('cover')">
        <cloud-image :src="artist?.img1v1Url"></cloud-image>
      </div>
      <div :class="ucn.e('info')">
        <div :class="ucn.e('name')">
          {{ artist?.name }}
          <div :class="ucn.e('alias')">{{ formatAlias(artist?.alias!) }}</div>
        </div>
        <div :class="ucn.e('desc')">{{ artist?.briefDesc }}</div>
        <div :class="ucn.e('meta-info')">
          <div :class="ucn.e('meta-item')">
            <div :class="ucn.e('title')">关注</div>
            <div :class="ucn.e('count')">{{ artist?.followCnt }}</div>
          </div>
          <div :class="ucn.e('meta-item')">
            <div :class="ucn.e('title')">粉丝</div>
            <div :class="ucn.e('count')">
              {{ formatCount(artist?.fansCnt) }}
            </div>
          </div>
          <div :class="ucn.e('meta-item')">
            <div :class="ucn.e('title')">音乐</div>
            <div :class="ucn.e('count')">{{ artist?.musicSize }}</div>
          </div>
          <div :class="ucn.e('meta-item')">
            <div :class="ucn.e('title')">专辑</div>
            <div :class="ucn.e('count')">{{ artist?.albumSize }}</div>
          </div>
          <div :class="ucn.e('meta-item')">
            <div :class="ucn.e('title')">MV</div>
            <div :class="ucn.e('count')">{{ artist?.mvSize }}</div>
          </div>
        </div>
        <div :class="ucn.e('operator')">
          <cloud-button type="primary" :icon="Play">播放全部</cloud-button>
          <cloud-button :icon="artist?.followed ? SubScribed : SubScribe">{{
            artist?.followed ? '已关注' : '关注'
          }}</cloud-button>
        </div>
      </div>
    </div>
    <cloud-tab
      :tabs="tabs"
      @update-value="handleUpdateValue"
      :value="tabValue"
    ></cloud-tab>
  </div>
</template>

<script setup lang="ts">
import { artistApi } from '@/api'
import { useClassName } from '@/hooks'
import { Play, SubScribe, SubScribed } from '@/icons'
import { formatAlias, formatCount } from '@/utils/format'
import { Artist } from '@/utils/type'
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const ucn = useClassName('artist', false)
defineOptions({
  name: 'Artist',
})

const router = useRouter()
const route = useRoute()
const artist = ref<Artist | null>(null)
// 获取歌手信息
const getData = async () => {
  try {
    const id = route.params.id as unknown as number
    // 获取基本信息
    const { artist: foundArtist } = await artistApi.getBaseInfo(id)
    artist.value = foundArtist || {}
    // 获取粉丝数和关注数
    const {
      data: { fansCnt, followCnt },
    } = await artistApi.getFans(id)
    artist.value!.fansCnt = fansCnt
    artist.value!.followCnt = followCnt

    const res = await artistApi.getDesc(id)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
getData()

// 导航栏
const tabs = [
  {
    name: 'desc',
    tab: '简介',
  },
  {
    name: 'music',
    tab: '音乐',
  },
  {
    name: 'album',
    tab: '专辑',
  },
  {
    name: 'mv',
    tab: 'MV',
  },
  {
    name: 'simi',
    tab: '相似歌手',
  },
]
const tabValue = computed(() => route.query.tab as string)
watchEffect(() => {
  if (!route.query || !route.query.tab)
    router.replace({ query: { tab: 'desc' } })
})
const handleUpdateValue = (val: any) => {
  router.replace({ query: { tab: val } })
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'artist', $use-namespace: false);

@include b() {
  width: 100%;
  display: flex;
  flex-direction: column;
  @include e('header') {
    display: flex;
    gap: 20px;
    @include e('cover') {
      width: 200px;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
      flex-shrink: 0;
    }
    @include e('info') {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      flex: 1;
      @include e('name') {
        display: flex;
        alllign-items: flex-end;
        font-size: getFontSize('larger');
        font-weight: 700;
      }
      @include e('desc') {
        font-size: getFontSize('small');
        color: getTextColor('secondary');
        @include multiEllipsis(2);
      }
      @include e('meta-info') {
        display: flex;
        gap: 20px;
        @include e('meta-item') {
          display: flex;
          align-items: center;
          gap: 10px;
          @include e('count') {
            font-size: getFontSize('medium');
            font-weight: 700;
            color: getColor('primary');
          }
        }
      }
      @include e('operator') {
        margin-top: auto;
        display: flex;
        gap: 10px;
      }
    }
  }
}
</style>
