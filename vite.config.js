import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/dashboard\/admin/, to: '/index.html' },
        { from: /^\/cart/, to: '/index.html' },
        { from: /^\/favorites/, to: '/index.html' },
        { from: /^\/profile/, to: '/index.html' },
        { from: /^\/history/, to: '/index.html' }
      ]
    }
  }
})
