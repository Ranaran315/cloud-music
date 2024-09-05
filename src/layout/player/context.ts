import { useSongStore } from '@/store'
import { SongWithUrl } from '@/utils/type'
import { InjectionKey, reactive, watchEffect } from 'vue'

interface PlayerContext {
  state: {
    isPlaying: boolean
    showViwes: boolean
    song: Partial<SongWithUrl>
    currentTime: number
    audio: HTMLAudioElement | null
  }
  changeViwes: () => void
  changePlaying: (play?: boolean) => void
  recordCurrentTime: (time: number) => void
  setAudio: (audio: HTMLAudioElement) => void
  changeCurrentTime: (time: number) => void
}

export const playerContextKey: InjectionKey<PlayerContext> =
  Symbol('playerContext')
export const userPlayerContext = () => {
  const songStore = useSongStore()
  const state = reactive({
    isPlaying: false,
    showViwes: false,
    song: songStore.song,
    currentTime: 0,
    audio: null as HTMLAudioElement | null,
  })

  watchEffect(() => {
    state.song = songStore.song
  })

  // 是否显示播放器全屏
  const changeViwes = () => {
    state.showViwes = !state.showViwes
    if (state.showViwes) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }

  // 改变播放状态
  const changePlaying = (play?: boolean) => {
    if (play == undefined) {
      state.isPlaying = !state.isPlaying
    } else {
      state.isPlaying = play
    }
  }

  // 记录当前播放时间
  const recordCurrentTime = (time: number) => {
    state.currentTime = time * 1000 // 转换为毫秒
  }

  // 设置 audio
  const setAudio = (audio: HTMLAudioElement) => {
    state.audio = audio
  }

  // 更改 audio 当前播放时间
  const changeCurrentTime = (time: number) => {
    state.audio!.currentTime = time
  }

  return {
    state,
    changeViwes,
    changePlaying,
    recordCurrentTime,
    setAudio,
    changeCurrentTime,
  }
}
