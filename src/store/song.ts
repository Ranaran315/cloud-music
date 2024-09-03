import { songApi } from '@/api'
import type { Song, SongDetail } from '@/utils/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const key = 'SONG'
export const useSongStore = defineStore(
  key,
  () => {
    // 当前播放的歌曲
    const currentSong = ref<Partial<SongDetail>>({})

    // 设置当前播放的歌曲
    const setCurrentSong = (newSong: Song) => {
      currentSong.value = newSong
      getSong(newSong.id.toString())
    }

    // 获取歌曲url
    const getSong = async (id: string) => {
      try {
        const { data } = await songApi.getSongUrl(id)
        const { url } = data[0]
        currentSong.value.url = url
      } catch (error) {
        console.error(error)
      }
    }

    return {
      currentSong,
      setCurrentSong,
    }
  },
  {
    persist: {
      key,
    },
  }
)
