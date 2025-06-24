import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    deps: {
      inline: ['@adobe/react-spectrum']
    },
    mock: {
      '\\.(css|less|sass|scss)$': () => ({}) // Mock CSS imports with an empty object
    }
  },
})
