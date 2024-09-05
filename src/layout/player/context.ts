import { useSongStore } from '@/store'
import { SongWithUrl } from '@/utils/type'
import { InjectionKey, reactive, watchEffect } from 'vue'

interface PlayerContext {
  state: {
    isPlaying: boolean
    showViwes: boolean
    song: Partial<SongWithUrl>
  }
  changeViwes: () => void
  changePlaying: () => void
}

export const playerContextKey: InjectionKey<PlayerContext> =
  Symbol('playerContext')
export const userPlayerContext = () => {
  const songStore = useSongStore()
  const state = reactive({
    isPlaying: false,
    showViwes: false,
    song: songStore.song,
  })

  watchEffect(() => {
    console.log('watchEffect')
    state.song = songStore.song
  })

  const changeViwes = () => {
    state.showViwes = !state.showViwes
  }

  const changePlaying = () => {
    state.isPlaying = !state.isPlaying
  }

  return { state, changeViwes, changePlaying }
}
