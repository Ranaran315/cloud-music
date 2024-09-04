import { songApi } from '@/api'
import type { Song, SongDetail } from '@/utils/type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLoginStore } from '@/store'

const key = 'SONG'
export const useSongStore = defineStore(
  key,
  () => {
    const loginStore = useLoginStore()
    // 当前播放的歌曲
    const currentSong = ref<Partial<SongDetail>>({})
    // 用户喜欢的音乐 id 列表
    const likedSongs = ref<number[]>([])
    // 转化为 Set，提高查询效率
    const likedlist = computed(() => new Set(likedSongs.value))

    // 设置当前播放的歌曲
    const setCurrentSong = (newSong: Song) => {
      currentSong.value = newSong
      getSong(newSong.id.toString())
    }

    // 获取歌曲url
    const getSong = async (id: string) => {
      try {
        const { data } = await songApi.getSongUrlV1(id)
        const { url } = data[0]
        currentSong.value.url = url
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

    // 喜欢音乐
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
      currentSong,
      setCurrentSong,
      likedlist,
      getUserLikedSongs,
      like,
    }
  },
  {
    persist: {
      key,
      paths: ['currentSong'],
    },
  }
)
