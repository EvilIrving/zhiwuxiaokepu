import { fileURLToPath, URL } from 'node:url'
import type { ConfigEnv, UserConfigExport } from 'vite'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import { viteVConsole } from 'vite-plugin-vconsole'
const resolve = (name: string): string => path.resolve(__dirname, name)
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  console.log(command, mode)

  return defineConfig({
    base: '/',
    build: {
      target: 'es2015',
      outDir: '植物小科普移动端', // 设置打包输出目录的名称
      assetsDir: 'assets',
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true, //在打包过程去去除所有的console.log()
          drop_debugger: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteVConsole({
        entry: resolve('src/main.js'),
        localEnabled: command === 'serve',
        enabled: command === 'build' && mode === 'test',
        config: {
          maxLogNumber: 1000,
          theme: 'light',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://47.100.227.140:8081',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
