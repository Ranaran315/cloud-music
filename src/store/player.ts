import { defineStore } from 'pinia'
import { useToPlaylistStore } from './to-playlist'
import { reactive, toRefs } from 'vue'
import { SongWithUrl } from '@/utils/type'
import { songApi } from '@/api'

const playModes = ['listLoop', 'singleLoop', 'shuffle'] as const
type PlayModes = (typeof playModes)[number]
interface LocalState {
  currentSongId: number
  currentTime: number
  volume: number
  playMode: PlayModes
}
interface State {
  isPlaying: boolean
  showFullScreen: boolean
  currentSong: SongWithUrl | null
  isMuted: boolean
  audio: HTMLAudioElement | null
}

const key = 'PLAYER'
export const usePlayerStore = defineStore(
  key,
  () => {
    // 播放列表仓库
    const toPlaylistStore = useToPlaylistStore()

    // 需要本地化存储的状态
    const localState = reactive<LocalState>({
      currentSongId: 0, // 当前播放歌曲 id
      currentTime: 0, // 当前播放时间（毫秒）
      volume: 1, // 音量大小
      playMode: 'listLoop', // 播放模式
    })
    // 状态
    const state = reactive<State>({
      isPlaying: false, // 是否正在播放
      showFullScreen: false, // 全屏展示
      currentSong: null, // 当前播放的歌曲
      isMuted: false, // 是否静音
      audio: null, // audio 模板引用
    })

    /**
     * @description 初始化
     */
    async function init(audio: HTMLAudioElement) {
      state.audio = audio
      audio.addEventListener('loadedmetadata', () => {
        console.log('音乐加载完成')
        doPlay()
      })
      await getSongInfo()
      updateAudioTime(getState().currentTime)
      setVolume(getState().volume)
    }

    /**
     * @description 处理 audio
     * @param callback 一个函数，它会携带一个 audio
     * @returns
     */
    function handleAudio(callback: (audio: HTMLAudioElement) => void) {
      const audio = getState().audio
      if (!audio) return
      callback(audio)
    }

    /**
     * @description 根据 currentSongId 获取歌曲信息
     */
    async function getSongInfo() {
      const id = localState.currentSongId
      if (!id) return
      const { songs } = await songApi.getSongDetail(id)
      const { data } = await songApi.getSongUrlV1(id)
      state.currentSong = {
        ...songs[0],
        url: data[0].url,
      }
    }

    /**
     * @description 返回仓库所有的状态
     * @returns
     */
    function getState() {
      return reactive({
        ...toRefs(state),
        ...toRefs(localState),
      })
    }

    /**
     * @description 设置音量
     * @param volume 音量大小（0 ~ 1）
     */
    function setVolume(volume: number) {
      localState.volume = Math.min(Math.max(volume, 0), 1) // 确保音量在 0~1 之间
      handleAudio((audio) => (audio.volume = volume))
    }

    /**
     * @description 设置当前播放的歌曲 id
     * @param id 歌曲 id
     */
    async function setCurrentSong(id?: number) {
      if (!id) return
      localState.currentSongId = id
      localState.currentTime = 0 // 重置播放时长
      getSongInfo()
    }

    /**
     * @description 更新当前播放时长
     * @param time 播放时长（毫秒）
     */
    function recordCurrentTime(time: number) {
      getState().currentTime = time
    }

    /**
     * @description 更新 audio 的播放时长
     */
    function updateAudioTime(time: number) {
      handleAudio((audio) => (audio.currentTime = time / 1000))
    }

    /**
     * @description 切换播放状态
     * @param play
     */
    function togglePlay(play?: boolean) {
      const { isPlaying } = toRefs(getState())
      if (play != undefined) isPlaying.value = play
      else isPlaying.value = !isPlaying.value
      doPlay()
      // 如果开始播放，可能需要从这里调用音频播放的 API
      // 如果暂停，可能需要调用音频暂停的 API
    }

    /**
     * @description audio 播放与暂停
     */
    function doPlay() {
      handleAudio(async (audio) => {
        if (getState().isPlaying) {
          await audio.play()
        } else {
          audio.pause()
        }
      })
    }

    /**
     * @description 切换静音状态
     * @param muted
     */
    function toggleMuted(muted?: boolean) {
      const { isMuted } = toRefs(getState())
      if (muted != undefined) isMuted.value = muted
      else isMuted.value = !isMuted.value
      getState().audio!.muted = isMuted.value
    }

    /**
     * @description 切换全屏展示播放器状态
     */
    function toggleFullScreen() {
      state.showFullScreen = !state.showFullScreen
      document.body.style.overflowY = state.showFullScreen ? 'hidden' : 'auto'
    }

    /**
     * @description 切换播放模式
     */
    function togglePlayMode() {
      let index = playModes.indexOf(localState.playMode)
      if (++index >= playModes.length) {
        index = 0
      }
      localState.playMode = playModes[index]
    }

    /**
     * @description 获取当前歌曲在播放列表中的索引
     * @returns
     */
    const getCurrentSongIndex = () => {
      const ids = toPlaylistStore.getList()
      let index: number = 0
      if (ids.length > 1) {
        const id = getState().currentSongId
        if (id) {
          index = ids.indexOf(id)
        }
      }
      return {
        ids,
        index,
      }
    }

    /**
     * @description 下一首歌曲
     */
    const next = () => {
      const { ids, index } = getCurrentSongIndex()
      if (index >= ids.length - 1 || index === -1) {
        setCurrentSong(ids[0])
      }
      setCurrentSong(ids[index + 1])
    }

    /**
     * @description 上一首歌曲
     */
    const prev = () => {
      const { ids, index } = getCurrentSongIndex()
      if (index <= 0 || index === -1) {
        setCurrentSong(ids.length - 1)
      }
      setCurrentSong(ids[index - 1])
    }

    /**
     * @description 音乐播放后的行为，例如根据播放方式决定下一首如何播放
     */
    function end() {
      switch (getState().playMode) {
        case 'listLoop':
          next()
          break
        case 'singleLoop':
          // @todo
          break
        case 'shuffle':
          // @todo
          break
      }
    }

    return {
      init,
      localState,
      state,
      getState,
      setCurrentSong,
      setVolume,
      recordCurrentTime,
      updateAudioTime,
      togglePlay,
      toggleFullScreen,
      toggleMuted,
      togglePlayMode,
      next,
      prev,
      end,
    }
  },
  {
    persist: {
      key,
      paths: ['localState'],
    },
  }
)
