import { InjectionKey, reactive } from 'vue'

interface PlayerContext {
  state: {
    isPlaying: boolean
    showViwes: boolean
  }
  changeViwes: () => void
}

export const playerContextKey: InjectionKey<PlayerContext> =
  Symbol('playerContext')
export const userPlayerContext = () => {
  const state = reactive({
    isPlaying: false,
    showViwes: false,
  })

  const changeViwes = () => {
    state.showViwes = !state.showViwes
  }

  return { state, changeViwes }
}
