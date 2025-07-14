import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/user': 'http://localhost:5000', // Replace with your backend URL and port
      '/api/campaigns' : 'http://localhost:5000',
      '/api/payments' : 'http://localhost:5000',
      '/api/donations' : 'http://localhost:5000',
      '/api/reports' : 'http://localhost:5000',
    },
  }
})
