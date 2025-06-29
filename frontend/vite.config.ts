import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      host: 'localhost',
      port: 3000,
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
})
