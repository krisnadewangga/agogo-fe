import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      unstated: '/src/lib/unstated-compat.js',
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('react') || id.includes('scheduler')) {
            return 'vendor-react'
          }

          if (
            id.includes('reactstrap') ||
            id.includes('bootstrap') ||
            id.includes('react-number-format') ||
            id.includes('react-time-picker') ||
            id.includes('react-simple-keyboard')
          ) {
            return 'vendor-ui'
          }

        },
      },
    },
  },
})