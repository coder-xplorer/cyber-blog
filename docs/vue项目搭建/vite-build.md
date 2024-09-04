# Vite 打包配置

[官方文档](https://vitejs.dev/config/)

### 配置兼容低版本浏览器

使用 @vitejs/plugin-legacy 插件去处理兼容低版本浏览器的代码。

### 适配屏幕的方案 vw、vh

可以使用 **postcss-px-to-viewport-8-plugin** 方案去解决适配屏幕的问题，如何需要配置宽度和高度，需要两个配置，一个配置宽度，一个配置高度。具体代码在 vite.config.ts 中配置。

### vite.config 代码

```ts title="vite.config.ts"
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

// 自动导入 按需加载 ElementPlus 组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// 自动导入 按需加载 Iconify 图标
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig(({ mode }) => {
  return {
    // 打包之后的路径，需要带上服务器的路径
    base: mode === 'development' ? '/' : '/zhzx/',
    // 插件配置
    plugins: [
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: 'url' }),
      // 雪碧图，将所有的 SVG 图标转换为雪碧图，减少请求数量
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
      }),

      // 自动导入组件
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            prefix: 'Icon', //默认为 i ，设置为 false 则不显示前缀
            enabledCollections: ['ep'],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      // 浏览器兼容性处理插件
      legacy({
        targets: ['defaults', 'ie >= 11', 'chrome 52'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // 地址
      host: true,
      // 端口
      port: 3333,
      open: true,
    },
    build: {
      // 单个 chunk 文件的大小超过 2048KB 时发出警告
      chunkSizeWarningLimit: 2048,
      // 禁用 gzip 压缩大小报告
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus', '@element-plus/icons-vue'],
          },
        },
      },
    },
    esbuild: {
      // 打包时移除 console.log
      pure: ['console.log'],
      // 打包时移除 debugger
      drop: ['debugger'],
      // 打包时移除所有注释
      legalComments: 'none',
    },
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            unitToConvert: 'px',
            viewportWidth: 1900,
            unitPrecision: 1, // 单位转换后保留的精度
            propList: [
              'width',
              'top',
              'bottom',
              'left',
              'right',
              'margin-left',
              'margin-right',
              'text-indent',
              'padding-left',
              'padding-right',
              'margin-top',
              'margin-bottom',
              'padding-top',
              'padding-bottom',
              'padding',
              'margin',
              'font-size',
              'gap',
            ],
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            landscape: false,
            selectorBlackList: ['ignore-'],
          }),
          postcsspxtoviewport8plugin({
            unitToConvert: 'px',
            viewportWidth: 905,
            propList: ['height', 'line-height'],
            unitPrecision: 1, // 单位转换后保留的精度
            viewportUnit: 'vh', // 希望使用的视口单位
            fontViewportUnit: 'vh', // 字体使用的视口单位
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            landscape: false,
          }),
        ],
      },
    },
  };
});
```
