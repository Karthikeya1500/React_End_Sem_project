import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'styled-components': ['styled-components']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    hmr: {
      overlay: true
    }
  },
  base: '/',
  publicDir: 'public',
  root: '.'
})
