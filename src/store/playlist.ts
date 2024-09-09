import { playlistApi, recommendApi } from '@/api'
import type { Playlist, Song, RecommendPlaylist } from '@/utils/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const key = 'PLAYLIST'
export const usePlaylistStore = defineStore(
  key,
  () => {
    // 当前歌单 id
    const pid = ref<number | null>(-1)
    // 当前歌单
    const currentPlaylist = ref<Partial<Playlist>>({})
    // 当前歌单中的所有歌曲
    const songs = ref<Song[]>([])
    // 获取歌曲列表时的 loading
    const songsLoading = ref(false)
    // 缓存时间
    const cache = ref(0)
    // 推荐歌单
    const recommendlist = ref<RecommendPlaylist[]>([])

    // 获取推荐歌单
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
        cache.value = Date.now()
      } catch (error) {
        console.error(error)
      }
    }

    // 设置当前歌单 id
    const setCurrentPlaylistId = (id: number) => {
      // console.log('setCurrentPlaylistId', id)
      pid.value = id
    }

    // 获取歌单详情
    const getPlaylistDetail = async () => {
      console.log('getPlaylistDetail', pid.value)
      try {
        currentPlaylist.value = {} // 清空当前歌单
        songs.value = [] // 清空当前歌单中的所有歌曲
        if (!pid.value) return
        // 每日推荐
        if (pid.value === -1) {
          songsLoading.value = true
          const {
            data: { dailySongs },
          } = await recommendApi.getRecommendSongs()
          songs.value = dailySongs
          const firstSong: Song = dailySongs[0]
          currentPlaylist.value = {
            id: -1,
            name: '每日推荐',
            description: `今天从《${firstSong.name}》开始。聆听每日推荐，发现更多好音乐`,
            coverImgUrl: (dailySongs[0] as Song).al.picUrl,
          }
        } else {
          // 获取歌单详情
          const { playlist } = await playlistApi.getPlaylistDetail(pid.value)
          currentPlaylist.value = playlist
          // 获取歌单的所有歌曲
          songsLoading.value = true
          const { songs: playlistSongs } =
            await playlistApi.getPlaylistAllTracks(playlist.id)
          songs.value = playlistSongs
        }
      } catch (error) {
        console.log(error)
      } finally {
        songsLoading.value = false
      }
    }

    return {
      pid,
      setCurrentPlaylistId,
      currentPlaylist,
      getPlaylistDetail,
      songs,
      cache,
      recommendlist,
      getRecommendList,
      songsLoading,
    }
  },
  {
    persist: {
      key,
      paths: ['pid', 'cache', 'recommendlist'],
    },
  }
)
