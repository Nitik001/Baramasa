import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap'],
          'vendor-lenis': ['lenis', 'split-type'],
          'vendor-icons': ['lucide-react']
        }
      }
    },
    cssCodeSplit: true
  }
})
