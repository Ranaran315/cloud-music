import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store
export * from './login'
export * from './user'
export * from './playlist'
export * from './song'
export * from './to-playlist'
