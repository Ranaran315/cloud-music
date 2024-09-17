<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('header')">
      <div :class="ucn.e('header-item')">
        <div :class="ucn.e('cover')">
          <cloud-image preview :src="playlist?.coverImgUrl" />
        </div>
        <div :class="ucn.e('info')">
          <div :class="ucn.e('title')" style="margin-bottom: 0">
            {{ playlist?.name }}
          </div>
          <div :class="ucn.e('description')">
            {{ playlist?.description }}
          </div>
          <div :class="ucn.e('tags')" v-if="playlist?.tags">
            <cloud-tag v-for="tag in playlist?.tags" :key="tag">
              {{ tag }}
            </cloud-tag>
          </div>
          <div :class="ucn.e('count-meta')" v-if="!isDailyRecommend">
            <span
              v-for="(item, index) of countMeta"
              :key="index"
              :class="ucn.e('count-meta-item')"
              ><span :class="ucn.e('count-meta-item-number')">{{
                formatCount(item.number)
              }}</span>
              {{ item.label }}
            </span>
          </div>
          <div :class="ucn.e('creator')" v-if="!isDailyRecommend">
            <div :class="ucn.e('avatar')">
              <cloud-image :src="playlist?.creator?.avatarUrl"></cloud-image>
            </div>
            <span :class="ucn.e('nickname')">{{
              playlist?.creator?.nickname
            }}</span>
            <div :class="ucn.e('time-meta')">
              <div
                v-for="(item, index) of timeMeta"
                :key="index"
                :class="ucn.e('time-meta-item')"
              >
                {{ `${item.label} ${formatTime(item.number)}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="ucn.e('header-item')">
        <div :class="ucn.e('operator')">
          <cloud-button type="primary" :icon="Play" @click="playAll">
            播放全部
          </cloud-button>
          <cloud-button :icon="Collect">收藏 </cloud-button>
          <cloud-button :icon="Download">下载</cloud-button>
        </div>
      </div>
    </div>
    <cloud-songlist :data="songs" :loading="loading"></cloud-songlist>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { useToPlaylistStore } from '@/store'
import { formatCount, formatTime } from '@/utils/format'
import { computed, ref, watchEffect } from 'vue'
import { Play, Collect, Download } from '@/icons'
import { PlaylistDetail, Song } from '@/utils/type'
import { playlistApi, recommendApi } from '@/api'
import { useRoute } from 'vue-router'

const ucn = useClassName('playlist', false)
defineOptions({
  name: 'Playlist',
})

const route = useRoute()
const toPlaylistStore = useToPlaylistStore()

// 是否是每日推荐歌单
const isDailyRecommend = computed(() => playlist.value?.id === -1)
const countMeta = computed(() => {
  return [
    {
      number: playlist.value?.trackCount,
      label: '首歌',
    },
    {
      number: playlist.value?.playCount,
      label: '次播放',
    },
    {
      number: playlist.value?.subscribedCount,
      label: '次收藏',
    },
    {
      number: playlist.value?.shareCount,
      label: '次分享',
    },
    {
      number: playlist.value?.commentCount,
      label: '次评论',
    },
  ]
})
const timeMeta = computed(() => [
  {
    number: playlist.value?.createTime,
    label: '创建于',
  },
  {
    number: playlist.value?.updateTime,
    label: '更新于',
  },
  {
    number: playlist.value?.trackUpdateTime,
    label: '歌曲更新于',
  },
])

// 获取歌单详情
const playlist = ref<PlaylistDetail | null>(null)
const songs = ref<Song[]>([])
const loading = ref(false)
watchEffect(async () => {
  try {
    loading.value = true
    const id = route.params.id as unknown as number
    playlist.value = null // 清空当前歌单
    songs.value = [] // 清空当前歌单中的所有歌曲
    if (!id) return
    // 每日推荐
    if (id == -1) {
      const {
        data: { dailySongs },
      } = await recommendApi.getRecommendSongs()
      songs.value = dailySongs
      const firstSong: Song = dailySongs[0]
      playlist.value = {
        id: -1,
        name: '每日推荐',
        description: `今天从《${firstSong.name}》开始。聆听每日推荐，发现更多好音乐`,
        coverImgUrl: (dailySongs[0] as Song).al.picUrl,
      } as PlaylistDetail
    } else {
      // 获取歌单详情
      const { playlist: resullt } = await playlistApi.getPlaylistDetail(id)
      playlist.value = resullt
      // 获取歌单的所有歌曲
      const { songs: playlistSongs } = await playlistApi.getPlaylistAllTracks(
        id
      )
      songs.value = playlistSongs
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})

// 播放全部
const playAll = () => {
  const ids = songs.value.map((item) => item.id)
  toPlaylistStore.addToPlaylist(ids)
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'playlist',
  $use-namespace: false
);

@include b() {
  width: 100%;
  display: flex;
  flex-direction: column;
  @include e('header') {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    @include e('header-item') {
      display: flex;
      gap: 30px;
      width: 100%;
      @include e('cover') {
        aspect-ratio: 1 / 1;
        min-width: 200px;
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      @include e('info') {
        flex-shrink: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        @include e('title') {
          font-size: 1.5rem;
          font-weight: 700;
        }
        @include e('description') {
          width: 100%;
          text-align: left;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @include e('count-meta') {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          @include e('count-meta-item') {
            display: flex;
            gap: 5px;
            align-items: center;
            @include e('count-meta-item-number') {
              font-size: 1.2rem;
              font-weight: 700;
              color: getColor('primary');
            }
          }
        }
        @include e('creator') {
          display: flex;
          align-items: center;
          gap: 10px;
          @include e('avatar') {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          @include e('time-meta') {
            display: flex;
            align-items: center;
            gap: 10px;
            color: getTextColor('secondary');
          }
        }
      }
      @include e('operator') {
        display: flex;
        gap: 10px;
      }
    }
  }
}
</style>
