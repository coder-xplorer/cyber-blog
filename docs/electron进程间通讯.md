## 一、进程间通信（IPC）基础概念

在 Electron 应用中，存在两种主要进程：主进程（Main Process） 和渲染进程（Renderer Process），二者职责不同且运行在独立的环境中，进程间通信（IPC，Inter-Process Communication）是实现它们协同工作的核心机制。​
主进程：运行在 Node.js 环境中，负责管理整个应用的生命周期、窗口创建、原生模块调用等底层操作，一个应用只有一个主进程。​
渲染进程：每个窗口对应一个渲染进程，运行在 Chromium 浏览器环境中，负责页面渲染和用户交互，可存在多个。​
由于主进程和渲染进程的运行环境隔离，它们无法直接共享内存或调用彼此的方法，必须通过 IPC 机制传递消息来实现数据交互。

使用 `electron-toolkit/preload` 插件，主进程与渲染进程的交互变得更加简单。

```js title="preload/index.js"
// 从Electron中导入contextBridge模块
// contextBridge用于在隔离的上下文环境中安全地暴露API到渲染进程
import { contextBridge } from 'electron';

// 从@electron-toolkit/preload导入electronAPI
// 这是一个预定义的Electron API集合，提供了常用的Electron功能访问
import { electronAPI } from '@electron-toolkit/preload';

// 定义自定义API对象，用于暴露我们自己的功能给渲染进程
// 初始为空对象，后续可以根据需要添加自定义方法和属性
const api = {};

// 检查当前是否运行在隔离的上下文环境中
// Electron推荐启用上下文隔离(context isolation)以提高安全性
if (process.contextIsolated) {
  try {
    // 使用contextBridge安全地将electronAPI暴露到渲染进程的window对象下
    // 第一个参数是暴露在window中的属性名('electron')
    // 第二个参数是要暴露的API对象(electronAPI)
    contextBridge.exposeInMainWorld('electron', electronAPI);

    // 同样地，将我们的自定义API暴露到渲染进程
    // 这样在渲染进程中就可以通过window.api访问我们定义的功能
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    // 如果暴露API过程中发生错误，在控制台打印错误信息
    console.error(error);
  }
} else {
  // 如果没有启用上下文隔离(不推荐)，直接将API挂载到window对象
  // 这种方式安全性较低，因为渲染进程可以直接访问Node.js API
  window.electron = electronAPI;
  window.api = api;
}
```

```js title='main.js'
// 从preload路径导入渲染进程预加载脚本
const preload = path.join(__dirname, 'preload/index.js');
const mainWindow = new BrowserWindow({
  fullscreen: true,
  show: false,
  autoHideMenuBar: true,
  icon,
  webPreferences: {
    preload,
    sandbox: false,
  },
});
```

```js title="页面中使用"
// 向主进程发送消息，不需要返回结果
// 第一个参数是消息通道名称（'electron:say'），用于主进程识别不同类型的消息
// 第二个参数是要发送的数据（'hello'），可以是字符串、数字、对象等可序列化的数据
window.electron.ipcRenderer.send('electron:say', 'hello');

// 向主进程发送消息，并异步接收返回结果
// 使用invoke方法发送消息，主进程需要通过ipcMain.handle()来处理并返回结果
// 第一个参数是消息通道名称（'electron:doAThing'）
// 第二个参数是发送给主进程的数据（空字符串''）
// then()方法中的回调函数用于处理主进程返回的结果（re）
window.electron.ipcRenderer.invoke('electron:doAThing', '').then((re) => {
  console.log(re); // 打印主进程返回的结果
});

// 监听来自主进程的消息
// on()方法用于注册一个持久化的监听器，只要不手动移除就会一直生效
// 第一个参数是要监听的消息通道名称（'electron:reply'）
// 第二个参数是回调函数，接收两个参数：事件对象（通常用_忽略）和主进程发送的数据（args）
window.electron.ipcRenderer.on('electron:reply', (_, args) => {
  console.log(args); // 打印主进程发送过来的数据
});

// 移除监听器（取消监听）
// 先通过on()方法注册监听器，并将返回值（一个移除函数）保存到变量中
const removeListener = window.electron.ipcRenderer.on(
  'electron:reply',
  (_, args) => {
    // 这里是监听到消息后的处理逻辑
  }
);
// 调用移除函数，取消对'electron:reply'通道的监听
// 之后将不再收到该通道的消息
removeListener();
```
