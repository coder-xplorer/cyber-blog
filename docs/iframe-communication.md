---
sidebar_position: 1
---

# Iframe 通信

### 需求背景

在工作中，我们会遇到一些需求，使用 iframe 嵌套另一个页面，这个页面大部分情况下不会部署在父页面相同的域名下，但是又需要父子页面进行数据交互，那么我们该怎么处理呢？

### 解决方案

#### 1、通过 URl 传递参数

只需将参数拼接到 url 上即可，**适用于参数固定且不需要复杂通讯的场景**

```javascript
// 获取 url 参数
const urlParams = new URLSearchParams(location.search);
const val = urlParams.get('key');
```

#### 2、通过 postMessage 方法

```js title="子页面向父页面传递"
/**
 * message 发送的消息内容 可以是任意类型的数据，如字符串、对象等。
 * targetOrigin 目标窗口的源，用于限制接收消息的窗口。可以是具体的URL或通配符(*)
 */

window.parent.postMessage(message, targetOrigin);
```

```js title="父页面向子页面传递"
let send = document.getElementById('iframeContainer').contentWindow;
send.postMessage('我是父页面发的数据', '*');
```

```js title="监听传递的消息"
useEffect(() => {
  const fn = () => {
    // 检查消息源，确保只接收来自特定源的消息
    if (event.origin === allowedOrigin) {
      // 处理接收到的消息
      const message = event.data;
    }
  };
  window.addEventListener('message', fn);
  return () => {
    window.removeEventListener('message', fn);
  };
}, []);
```

#### 3、使用第三方包 Postmate
