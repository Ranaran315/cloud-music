import { playlistApi } from '@/api'
import usePlaylistStorage from '@/utils/storage/playlist'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Playlist {
  id: number
  name: string
  coverImgUrl: string
  createTime: number
  updateTime: number
  trackUpdateTime: number
  playCount: number
  subscribedCount: number
  shareCount: number
  commentCount: number
  description: string
  tags: string[]
  titleImageUrl: string
  detailPageTitle: string
  subscribers: {
    userId: number
    avatarUrl: string
    nickname: string
  }[]
  creator: {
    userId: number
    avatarUrl: string
    nickname: string
  }
}
const playlistStorage = usePlaylistStorage()
export const usePlaylistStore = defineStore('playlist', () => {
  // 当前歌单 id
  const currentPlaylistId = ref<number | null>(playlistStorage.getPlaylistId())
  const currentPlaylist = ref<Playlist | any>({})

  // 设置当前歌单 id
  const setCurrentPlaylistId = (id: number) => {
    // console.log('setCurrentPlaylistId', id)
    currentPlaylistId.value = id
    playlistStorage.setPlaylistId(id)
  }

  const getPlaylistDetail = async () => {
    try {
      // nextTick(() => {
      //   console.log('nextTick', currentPlaylistId.value)
      // })
      // console.log('getPlaylistDetail', currentPlaylistId.value)
      if (!currentPlaylistId.value) return
      // 获取歌单详情
      const { playlist } = await playlistApi.getPlaylistDetail(
        currentPlaylistId.value
      )
      currentPlaylist.value = playlist
      // 获取歌单的所有歌曲
      const { privileges, songs } = await playlistApi.getPlaylistAllTracks(
        playlist.id
      )
      console.log(playlist, privileges, songs)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    currentPlaylistId,
    setCurrentPlaylistId,
    currentPlaylist,
    getPlaylistDetail,
  }
})
