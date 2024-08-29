import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/route'

const store = createPinia()

createApp(App).use(store).use(router).mount('#app')
