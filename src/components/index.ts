import { App } from 'vue'
import { CloudButton } from './button'
import { CloudTooltip } from './tooltip'
import { CloudImage } from './image'
import { CloudTag } from './tag'
import { CloudSonglist } from './songlist'
import { CloudProgress } from './progress'
import { CloudLoading } from './loading'

const components = [
  CloudButton,
  CloudTooltip,
  CloudImage,
  CloudTag,
  CloudSonglist,
  CloudProgress,
  CloudLoading,
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
export { default as useLogin } from './login/function'
