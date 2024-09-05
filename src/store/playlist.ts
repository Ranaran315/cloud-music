import { playlistApi, recommendApi } from '@/api'
import { Playlist, Song } from '@/utils/type'
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
    const currentSonglist = ref<Song[]>([])

    // 设置当前歌单 id
    const setCurrentPlaylistId = (id: number) => {
      // console.log('setCurrentPlaylistId', id)
      pid.value = id
    }

    // 获取歌单详情
    const getPlaylistDetail = async () => {
      try {
        currentPlaylist.value = {}
        if (!pid.value) return
        if (pid.value === -1) {
          // 每日推荐
          const {
            data: { dailySongs },
          } = await recommendApi.getRecommendSongs()
          currentSonglist.value = dailySongs
          currentPlaylist.value = {
            id: -1,
            name: '每日推荐',
            coverImgUrl: (dailySongs[0] as Song).al.picUrl,
          }
        } else {
          // 获取歌单详情
          const { playlist } = await playlistApi.getPlaylistDetail(pid.value)
          currentPlaylist.value = playlist
          // 获取歌单的所有歌曲
          const { songs } = await playlistApi.getPlaylistAllTracks(playlist.id)
          currentSonglist.value = songs
        }
      } catch (error) {
        console.log(error)
      }
    }

    return {
      pid,
      setCurrentPlaylistId,
      currentPlaylist,
      getPlaylistDetail,
      currentSonglist,
    }
  },
  {
    persist: {
      key,
      paths: ['pid'],
    },
  }
)
