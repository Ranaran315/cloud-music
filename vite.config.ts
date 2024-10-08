import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5500,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/var" as *;
        @use "@/style/mixin" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
