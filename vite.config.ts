import { defineConfig } from 'vite'

export default defineConfig({
  base: '/weblarek/', // ← добавили эту строку
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
})
