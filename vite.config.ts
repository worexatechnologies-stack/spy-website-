import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/send_email.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
