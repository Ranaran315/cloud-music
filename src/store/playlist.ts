import { playlistApi } from '@/api'
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
    const currentSonglist = ref<Song[]>([])

    // 设置当前歌单 id
    const setCurrentPlaylistId = (id: number) => {
      // console.log('setCurrentPlaylistId', id)
      pid.value = id
    }

    // 获取歌单详情
    const getPlaylistDetail = async () => {
      try {
        // nextTick(() => {
        //   console.log('nextTick', pid.value)
        // })
        // console.log('getPlaylistDetail', pid.value)
        if (!pid.value) return
        // 获取歌单详情
        const { playlist } = await playlistApi.getPlaylistDetail(pid.value)
        currentPlaylist.value = playlist
        // 获取歌单的所有歌曲
        const { songs } = await playlistApi.getPlaylistAllTracks(playlist.id)
        currentSonglist.value = songs
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
