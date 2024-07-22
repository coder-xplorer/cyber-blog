# 无线端开发注意事项

## meta 标签

```jsx title="设置视口（Viewport）"
/**
 * width=device-width 使用设备的宽度作为视口的宽度，使得页面能够根据设备的屏幕宽度进行自适应布局。
 * initial-scale=1.0 使得页面在加载时以原始比例进行显示，不进行任何缩放。
 * maximum-scale=1.0 限制用户在移动设备上对页面进行缩放时的最大比例为 1，即不允许放大页面内容。
 * user-scalable=no 禁止用户在移动设备上进行缩放操作，即用户无法手动放大或缩小页面。
 */
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no"
></meta>
```

## 适配解决方案

```css
/**
 * ./utils/index.scss
 */
@function px($px) {
  @return $px / 750 * 100vw;
}

** 或者使用 postcss-px-to-viewport 插件解决适配 **

/**
* 使用
*/
@import './utils/index.scss';
.element {
  width: px(30);
}
```

## 去掉滚动条

```css
.scroll-container {
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

### 设置安全区域
