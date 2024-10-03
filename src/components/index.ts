import { App } from 'vue'
import { CloudButton } from './button'
import { CloudTooltip } from './tooltip'
import { CloudImage } from './image'
import { CloudTag } from './tag'
import { CloudSonglist } from './songlist'
import { CloudProgress } from './progress'
import { CloudLoading } from './loading'
import { CloudIcon } from './icon'
import { CloudPlaylistCards } from './playlist-cards'
import { CloudAlbumCards } from './album-cards'
import { CloudSongCards } from './song-cards'
import { CloudArtistCards } from './artist-cards'
import { CloudTab } from './tab'
import { CloudSkeleton } from './skeleton'

const components = [
  CloudButton,
  CloudTooltip,
  CloudImage,
  CloudTag,
  CloudSonglist,
  CloudProgress,
  CloudLoading,
  CloudIcon,
  CloudPlaylistCards,
  CloudAlbumCards,
  CloudSongCards,
  CloudArtistCards,
  CloudTab,
  CloudSkeleton,
]

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.use(component)
    })
  },
}

export * from './button'
export * from './tooltip'
export * from './image'
export * from './tag'
export * from './songlist'
export * from './progress'
export * from './loading'
export * from './icon'
export { default as useLogin } from './login/function'
export { default as useMessage } from './message/function'
export * from './contextmenu/function'
export * from './playlist-cards'
export * from './album-cards'
export * from './song-cards'
export * from './artist-cards'
export * from './tab'
export * from './skeleton'
