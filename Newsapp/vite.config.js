import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    cors: true,
    proxy: {
      '/api/v2': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        headers: {
          'X-Api-Key': '43c7bd4efad143be9de9f35313e3c3be'
        }
      }
    },
    port: 3000,
    open: true
  }
})
