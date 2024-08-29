import { App } from 'vue'
import { CloudButton } from './button'

const components = [CloudButton]

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.use(component)
    })
  },
}

export * from './button'
