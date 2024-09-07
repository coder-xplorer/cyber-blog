# 异步组件的定义

**在大型项目中，某些页面可能引入多个组件，并仅在需要时再从服务器加载相关组件。Vue 提供了 defineAsyncComponent 方法来实现此功能**

:::tip
当使用 **defineAsyncComponent** 定义异步组件后，在 vite 打包中会将它们作为打包时的代码分割点
:::

```js
import { defineAsyncComponent } from 'vue';

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
);
```

[vue 官网详细讲解](https://cn.vuejs.org/guide/components/async.html)

**其他配置支持**

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,
});
```
