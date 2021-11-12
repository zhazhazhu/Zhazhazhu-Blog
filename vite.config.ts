import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VitePluginElementPlus from 'vite-plugin-element-plus'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      VitePluginElementPlus({
        // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
        // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus
        // 的文档注释
        // useSource: true
        format: mode === 'development' ? 'esm' : 'cjs',
      }),
    ],
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '/@': path.join(__dirname, 'src'),
        'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.esm.js',
        'balm-ui-css': 'balm-ui/dist/balm-ui.css'
      }
    },
    css: {
      /* CSS 预处理器 */
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/scss/style.scss";'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3100
    }
  }
})
