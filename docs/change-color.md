# 多主题（动态换肤）模式的实现

**详细讲解请看这里：https://juejin.cn/post/7268123683222257701**

### 基本原理

基本原理非常简单，是通过改变 <html> 的 class 属性值来让预先写好的不同的 css 生效，从而实现主题的切换

举个例子，就好像是：

```scss
/** 黑暗模式 */
.dark {
  #app {
    color: #c0c4cc;
  }
  .login-container {
    color: #c0c4cc;
  }
}

/** 深蓝模式 */
.dark-blue {
  #app {
    color: rgba(255, 255, 255, 0.8);
  }
  .login-container {
    color: rgba(255, 255, 255, 0.8);
  }
}
```

在上述代码中我们定义了两个不同的主题，通过改变 html 的 class 属性值，我们就可以切换到对应的主题了，通过改变 html 的 class 类名去覆盖样式，从而实现主题的切换。

```js
document.documentElement.className = 'dark';
```

```scss
/** 正常页面写的样式 /view/home.vue */
.home {
  background: #fff;
}

// 当我们切换到dark主题的时候，就会覆盖掉 home 的样式，从而实现主题的切换。
//此时的类名会变成, .dark .home, 就会将原来的样式覆盖掉
.dark .home {
  background: #333;
}
```

### 主题样式文件

```scss title=styles/theme/dark/index.scss
// 在dark主题下定义好主题的颜色和名称
// 主题名称
$theme-name: 'dark';
// 主题背景颜色
$theme-bg-color: #141414;
```

```scss title=styles/theme/core/index.scss
// 每次切换后加载不同 theme-name 的变量
.#{$theme-name} {
  @import './home.scss';
}
```
