<template>
  <div :class="ucn.b()">
    <cloud-skeleton :show="loading">
      <template #skeleton>
        <Skeleton></Skeleton>
      </template>
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
            <cloud-button type="primary" :icon="Play" @click.stop="playAll"
              >播放全部</cloud-button
            >
            <cloud-button
              :icon="artist?.followed ? SubScribed : SubScribe"
              @click="subscribe"
              >{{ artist?.followed ? '已关注' : '关注' }}</cloud-button
            >
          </div>
        </div>
      </div>
    </cloud-skeleton>
    <cloud-tab :tabs="tabs" @update-value="handleUpdateValue" :value="tabValue">
      <template #default="{ tab }">
        <component :is="tab.component" :songs="songs"></component>
      </template>
    </cloud-tab>
  </div>
</template>

<script setup lang="ts">
import { artistApi, songApi } from '@/api'
import { useClassName } from '@/hooks'
import { Play, SubScribe, SubScribed } from '@/icons'
import { formatAlias, formatCount } from '@/utils/format'
import { Artist, Song } from '@/utils/interface'
import { computed, ref, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArtistProducation from './producation.vue'
import ArtistSongs from './songs.vue'
import ArtistAlbums from './albums.vue'
import SimiArtist from './simi-artists.vue'
import { usePlayerStore, useToPlaylistStore } from '@/store'
import { useMessage } from '@/components'
import Skeleton from './skeleton.vue'

const ucn = useClassName('artist', false)
defineOptions({
  name: 'Artist',
})

const playerStore = usePlayerStore()
const toPlaylistStore = useToPlaylistStore()

const router = useRouter()
const route = useRoute()
const artist = ref<Artist | null>(null)
const songs = ref<Song[]>([])
const loading = ref(false)
// 获取歌手信息
const getData = async () => {
  try {
    loading.value = true
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
    // 获取歌手的歌曲
    let { songs: result } = await artistApi.getSongs(id)
    const ids = result.map((item: Song) => item.id)
    ;({ songs: result } = await songApi.getSongDetail(ids))
    songs.value = result
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// 监听路由变化
watch(
  () => route.params.id,
  () => {
    getData()
  },
  {
    immediate: true,
  }
)

// 导航栏
const tabs = [
  {
    name: 'desc',
    tab: '简介',
    component: ArtistProducation,
  },
  {
    name: 'music',
    tab: '音乐',
    component: ArtistSongs,
    bind: {
      songs,
    },
  },
  {
    name: 'album',
    tab: '专辑',
    component: ArtistAlbums,
  },
  {
    name: 'mv',
    tab: 'MV',
  },
  {
    name: 'simi',
    tab: '相似歌手',
    component: SimiArtist,
  },
]
const tabValue = computed(() => route.query.tab as string)

// 当路由没有 tab 时，默认跳转到 desc
watchEffect(() => {
  if (!route.query || !route.query.tab)
    router.replace({ query: { tab: 'desc' } })
})

// 导航栏切换时
const handleUpdateValue = (val: any) => {
  router.replace({ query: { tab: val } })
}

// 播放全部
const playAll = () => {
  const ids = songs.value.map((item) => item.id)
  playerStore.setCurrentSong(ids[0])
  toPlaylistStore.add(ids)
  useMessage.success('添加成功！')
}

// 关注
const subscribe = () => {
  window.open(`https://music.163.com/#/artist?id=${route.params.id}`)
}
</script>

<style lang="scss">
@use '@/style/bem' as * with($block: 'artist', $use-namespace: false);

@include b() {
  width: 100%;
  display: flex;
  flex-direction: column;
  @include e('header') {
    @include flex($gap: 20px);
    @include e('cover') {
      width: 200px;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
      flex-shrink: 0;
    }
    @include e('info') {
      @include flex(column, flex-start, flex-start);
      flex: 1;
      @include e('name') {
        @include flex($justify: flex-start, $align: flex-end);
        font-size: getFontSize('larger');
        font-weight: 700;
      }
      @include e('desc') {
        font-size: getFontSize('small');
        color: getTextColor('secondary');
        @include multiEllipsis(2);
      }
      @include e('meta-info') {
        @include flex();
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
