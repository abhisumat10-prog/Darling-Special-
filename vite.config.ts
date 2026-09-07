import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { cpSync } from 'node:fs'
import { resolve } from 'node:path'

const copySandboxAssets = () => ({
  name: 'copy-sandbox-assets',
  closeBundle() {
    cpSync(resolve(import.meta.dirname, 'js'), resolve(import.meta.dirname, 'dist/js'), { recursive: true })
    cpSync(resolve(import.meta.dirname, 'challenges'), resolve(import.meta.dirname, 'dist/challenges'), { recursive: true })
  },
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copySandboxAssets(),
  ],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        sandbox: resolve(import.meta.dirname, 'sandbox.html'),
      },
    },
  },
})
