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
