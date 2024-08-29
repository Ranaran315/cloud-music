import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const store = createPinia()

createApp(App).use(store).mount('#app')
