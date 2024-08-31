import { App } from 'vue'
import { CloudButton } from './button'
import { CloudNavbar } from './navbar'

const components = [CloudButton, CloudNavbar]

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.use(component)
    })
  },
}

export * from './button'
export * from './navbar'
