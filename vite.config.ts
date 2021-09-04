import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  plugins: [reactRefresh(), reactJsx()],
  build: {
    rollupOptions: {
      // external: [/@material-ui\/styles\/jssPreset/, /refractor/],
    },
  },
})
