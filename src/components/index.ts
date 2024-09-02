import { App } from 'vue'
import { CloudButton } from './button'
import { CloudTooltip } from './tooltip'

const components = [CloudButton, CloudTooltip]

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.use(component)
    })
  },
}

export * from './button'
export * from './tooltip'
export { default as useLogin } from './login/function'
