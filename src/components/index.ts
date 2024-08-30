import { App } from 'vue'
import { CloudButton } from './button'
import { CloudSearch } from './input'

const components = [CloudButton, CloudSearch]

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.use(component)
    })
  },
}

export * from './button'
export * from './input'
