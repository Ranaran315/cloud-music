import { App, Component, Plugin } from 'vue'

type ComponentWithInstall<T> = T & Plugin
export const withInstall = <T extends Component>(comp: T) => {
  ;(comp as ComponentWithInstall<T>).install = (app: App) => {
    const { name } = comp as { name: string }
    app.component(name, comp)
  }
  return comp as ComponentWithInstall<T>
}
