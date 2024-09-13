import { App } from 'vue'
import { CloudButton } from './button'
import { CloudTooltip } from './tooltip'
import { CloudImage } from './image'
import { CloudTag } from './tag'
import { CloudSonglist } from './songlist'
import { CloudProgress } from './progress'
import { CloudLoading } from './loading'
import { CloudIcon } from './icon'
import { CloudPlaylistCard } from './playlist-card'
import { CloudAlbumCard } from './album-card'
import { CloudSongCard } from './song-card'
import { CloudArtistCard } from './artist-card'
import { CloudTab } from './tab'

const components = [
  CloudButton,
  CloudTooltip,
  CloudImage,
  CloudTag,
  CloudSonglist,
  CloudProgress,
  CloudLoading,
  CloudIcon,
  CloudPlaylistCard,
  CloudAlbumCard,
  CloudSongCard,
  CloudArtistCard,
  CloudTab,
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
export * from './playlist-card'
export * from './album-card'
export * from './song-card'
export * from './artist-card'
export * from './tab'
