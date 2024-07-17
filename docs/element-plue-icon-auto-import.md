# Element Plus 中 Icon 的自动导入

### 安装依赖

- 首先需要安装 2 个插件

```js
npm i -D unplugin-icons unplugin-vue-components
```

### vite 配置

- 修改配置文件

```ts title='vite.config.ts'
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// 自动导入 按需加载 ElementPlus 组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// 自动导入 按需加载 Iconify 图标
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'development' ? '/' : '/',
    plugins: [
      vue(),
      vueJsx(),
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
    ],
  };
});
```

### 使用

- 按需引入后，需要加上 ep 才能够显示 icon 的图标
  **因为设置了前缀为 Icon, 所以是 Icon-ep-warning**

```html title='使用'
<el-icon><Icon-ep-warning /></el-icon>
<el-icon><Icon-ep-circle-close-filled /></el-icon>
```

- 也可以使用 https://icon-sets.iconify.design/ep 中的图标

```html title='使用'
/** 从 iconify/ep 中找的图标 */
<el-icon><Icon-ep-circle-close-filled /></el-icon>
```
