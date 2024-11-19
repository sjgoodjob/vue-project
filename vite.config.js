import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [ElementPlusResolver()], // 自动按需导入 Element Plus 组件
    }),
  ],
  base: '/',  // 改为绝对路径，适用于浏览器加载
  build: {
    minify: 'terser',  // 使用 terser 进行 JS 最小化

    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true // 移除 debugger
      },
      format: {
        comments: false // 移除注释
      }
    },
    outDir: 'dist', // 输出到根目录下的 dist
    assetsDir: 'assets', // 静态资源目录
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash][extname]`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
