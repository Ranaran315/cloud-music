import { h, render } from 'vue'
import Login from './login.vue'

const createLoginInstance = () => {
  const container = document.createElement('div')
  const vnode = h(Login, {
    destory,
  })
  render(vnode, container)

  function destory() {
    render(null, container)
  }
}

export default createLoginInstance
