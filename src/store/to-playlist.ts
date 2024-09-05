import { defineStore, StateTree } from 'pinia'
import { ref } from 'vue'
import { useSongStore } from './song'

const key = 'TO_PLAYLIST'
export const useToPlaylistStore = defineStore(
  key,
  () => {
    // 播放列表
    const list = ref<Set<number>>(new Set())
    const songStore = useSongStore()

    // 添加歌曲到播放列表
    const setToPlaylist = (id: number | number[]) => {
      if (Array.isArray(id)) {
        id.forEach((item) => list.value.add(item))
      } else {
        list.value.add(id)
      }
    }

    // 下一首
    const next = () => {
      const ids = Array.from(list.value)
      if (ids.length <= 1) return
      let index: number = 0
      if (songStore.song.id) {
        index = ids.indexOf(songStore.song.id)
      }
      if (index >= ids.length - 1 || index === -1) {
        index = 0
      }
      songStore.setCurrentSong(ids[++index])
    }

    // 下一首
    const prev = () => {
      const ids = Array.from(list.value)
      if (ids.length <= 1) return
      let index: number = ids.length - 1
      if (songStore.song.id) {
        index = ids.indexOf(songStore.song.id)
      }
      if (index <= 0 || index === -1) {
        index = ids.length - 1
      }
      songStore.setCurrentSong(ids[--index])
    }

    // 清空播放列表
    const clear = () => {
      list.value.clear()
    }

    return {
      list,
      setToPlaylist,
      next,
      prev,
      clear,
    }
  },
  {
    persist: {
      key,
      paths: ['list'],
      serializer: {
        serialize: (value: StateTree) => {
          const serializedValue = {
            ...value,
            list: Array.from(value.list),
          }
          return JSON.stringify(serializedValue)
        },
        deserialize: (value: string) => {
          const result = JSON.parse(value)
          const deserializeResult = {
            ...result,
            list: new Set(result.list),
          }
          return deserializeResult
        },
      },
    },
  }
)
