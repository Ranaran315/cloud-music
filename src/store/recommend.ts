import { playlistApi, recommendApi } from '@/api'
import { RecommendPlaylist } from '@/utils/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const key = 'RECOMMEND'
export const useRecommendStore = defineStore(
  key,
  () => {
    const cache = ref(0) // 缓存时间
    const recommendlist = ref<RecommendPlaylist[]>([]) // 推荐歌单

    const getRecommendList = async () => {
      try {
        // 缓存时间小于 10 分钟则不重新获取
        if (Date.now() - cache.value < 1000 * 60 * 10) {
          return
        }

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
        const waitRecommend = await Promise.all(
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
            return {
              id,
              name,
              coverImgUrl,
              playCount,
              detailPageTitle,
              creator,
              createTime,
            }
          })
        )
        recommendlist.value.push(...waitRecommend)
        cache.value = Date.now()
      } catch (error) {
        console.error(error)
      }
    }

    return {
      cache,
      recommendlist,
      getRecommendList,
    }
  },
  {
    persist: true,
  }
)
