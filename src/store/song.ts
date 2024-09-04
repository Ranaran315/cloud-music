import { songApi } from '@/api'
import type { Song, SongWithUrl } from '@/utils/type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLoginStore } from '@/store'

const key = 'SONG'
export const useSongStore = defineStore(
  key,
  () => {
    const loginStore = useLoginStore()
    // 当前播放的歌曲
    const song = ref<Partial<SongWithUrl>>({})
    // 用户喜欢的音乐 id 列表
    const likedSongs = ref<number[]>([])
    // 转化为 Set，提高查询效率
    const likedlist = computed(() => new Set(likedSongs.value))
    /**
     * 设置当前播放的歌曲
     * @param newSong 歌曲对象或歌曲 id
     */
    const setCurrentSong = async (newSong: Song | number) => {
      try {
        if (typeof newSong === 'number') {
          const { songs } = await songApi.getSongDetail(newSong)
          newSong = songs[0] as Song
        }
        song.value = newSong
        getSong(newSong.id)
      } catch (error) {
        console.log(error)
      }
    }

    // 获取歌曲url
    const getSong = async (id: number) => {
      try {
        const { data } = await songApi.getSongUrlV1(id)
        const { url } = data[0]
        song.value.url = url
      } catch (error) {
        console.error(error)
      }
    }

    // 获取用户喜欢音乐列表
    const getUserLikedSongs = async () => {
      try {
        const userId = loginStore.userInfo.id
        if (!userId) return
        const { ids } = await songApi.getSongLikedList(userId)
        likedSongs.value = [...ids]
      } catch (error) {
        console.error(error)
      }
    }

    /**
     * @description 喜欢歌曲
     * @deprecated 由于网易云盾验证，无法使用
     * @param id 歌曲 id
     */
    const like = async (id: number) => {
      try {
        const liked = likedlist.value.has(id)
        await songApi.like(id, !liked)
        getUserLikedSongs()
      } catch (error) {
        console.error(error)
      }
    }

    return {
      song,
      setCurrentSong,
      likedlist,
      getUserLikedSongs,
      like,
    }
  },
  {
    persist: {
      key,
      paths: ['song'],
    },
  }
)
