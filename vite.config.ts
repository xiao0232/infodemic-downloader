import { ConfigEnv, defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => ({
  root: './',
  plugins: [reactRefresh(), reactJsx()],
  define: mode === 'development' && {
    global: {},
  },
}))
