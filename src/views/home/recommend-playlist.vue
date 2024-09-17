<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('title')">推荐歌单</div>
    <cloud-loading :show="loading">
      <div :class="ucn.e('list')">
        <cloud-playlist-card
          v-for="item of recommendlist"
          :key="item.id"
          :data="item"
        ></cloud-playlist-card>
      </div>
    </cloud-loading>
  </div>
</template>

<script setup lang="ts">
import { playlistApi, recommendApi } from '@/api'
import { useClassName } from '@/hooks'
import { Playlist } from '@/utils/type'
import { onMounted, ref } from 'vue'

const ucn = useClassName('recommend-playlist', false)

defineOptions({
  name: 'RecommendPlaylist',
})

const recommendlist = ref<Playlist[]>([])
const loading = ref(false)
onMounted(async () => {
  try {
    loading.value = true
    recommendlist.value = []
    // 获取每日推荐歌曲
    const {
      data: { dailySongs },
    } = (await recommendApi.getRecommendSongs()) as any
    const first = dailySongs.shift()
    recommendlist.value.push({
      id: -1, // 用于区分每日推荐歌单
      name: `每日推荐，从《${first.name}》 开始`,
      coverImgUrl: first.al?.picUrl,
      detailPageTitle: '每日推荐',
    })
    // 获取每日推荐歌单
    const { recommend } = (await recommendApi.getRecommendPlaylist()) as any
    await Promise.all(
      recommend.map(async (item: any) => {
        const {
          playlist: {
            id,
            name,
            coverImgUrl,
            playCount,
            detailPageTitle,
            creator,
            createTime,
          },
        } = (await playlistApi.getPlaylistDetail(item.id)) as any
        recommendlist.value.push({
          id,
          name,
          coverImgUrl,
          playCount,
          detailPageTitle,
          creator,
          createTime,
        })
      })
    )
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'recommend-playlist',
  $use-namespace: false
);

@include b() {
  padding: 20px 0;
  @include e('title') {
    font-family: 'deyihiei';
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: left;
  }
  @include e('list') {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    row-gap: 40px;
  }
}
</style>
