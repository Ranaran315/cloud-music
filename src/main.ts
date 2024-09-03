import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '@/store'
import router from '@/route'
import CloudComponents from '@/components'
import '@capybara-plus/vue/es/style.css'

createApp(App).use(store).use(router).use(CloudComponents).mount('#app')
