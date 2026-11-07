import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import { resolve } from 'path'
import manifest from './manifest.config'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],

  // Path aliases to match tsconfig paths
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@shared': resolve(__dirname, 'src/shared'),
      '@popup': resolve(__dirname, 'src/popup'),
      '@sidepanel': resolve(__dirname, 'src/sidepanel'),
    },
  },

  // Required for Chrome extension HMR during development
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    cors: {
      origin: [/^chrome-extension:\/\//],
    },
  },

  build: {
    // Output to 'dist' — this is the folder you load in Chrome
    outDir: 'dist',
    emptyOutDir: true,
    // Source maps help debug in Chrome DevTools
    sourcemap: false,
  },
})

