import { playlistApi, recommendApi } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface RecommendPlaylist {
  id: number
  name: string
  coverImgUrl: string
  playCount: number
  detailPageTitle: string
  creator: {
    userId: number
    nickname: string
    avatarUrl: string
  }
}
export const useRecommendStore = defineStore('recommend', () => {
  const recommendlist = ref<RecommendPlaylist[]>([])
  const getRecommendList = async () => {
    recommendlist.value = []
    const { recommend } = (await recommendApi.getRecommendPlaylist()) as any
    recommend.forEach(async (item: any) => {
      const {
        playlist: {
          id,
          name,
          coverImgUrl,
          playCount,
          detailPageTitle,
          creator,
        },
      } = (await playlistApi.getPlaylistDetail(item.id)) as any
      recommendlist.value.push({
        id,
        name,
        coverImgUrl,
        playCount,
        detailPageTitle,
        creator,
      })
    })
  }

  return {
    recommendlist,
    getRecommendList,
  }
})
