import { App } from 'vue'
import { CloudButton } from './button'
import { CloudNavbar } from './navbar'
import { CloudTooltip } from './tooltip'

const components = [CloudButton, CloudNavbar, CloudTooltip]

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.use(component)
    })
  },
}

export * from './button'
export * from './navbar'
export * from './tooltip'
