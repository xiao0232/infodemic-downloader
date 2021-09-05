import { ConfigEnv, defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import viteCompression from 'vite-plugin-compression'

import { visualizer } from 'rollup-plugin-visualizer'
// import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => ({
  root: './',
  plugins: [
    reactRefresh(),
    reactJsx(),
    viteCompression({ algorithm: 'brotliCompress' }),
  ],
  define: mode === 'development' && {
    global: {},
  },
  build: {
    rollupOptions: {
      plugins: [
        mode === 'visualize' && visualizer({ filename: './dist/stats.html' }),
      ],
      //     output: {
      //       manualChunks(id) {
      //         if (id.includes('node_modules')) {
      //           return id
      //             .toString()
      //             .split('node_modules/')[1]
      //             .split('/')[0]
      //             .toString()
      //         }
      //       },
      //     },
    },
  },
}))
