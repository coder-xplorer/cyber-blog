# Electron 应用自动更新教程

本教程将指导你如何使用 `electron-updater` 为你的 Electron 应用实现自动更新功能。我们将使用 `electron-builder` 进行打包，并通过 GitHub Releases 或私有服务器分发更新。

---

## 1. 环境准备

### 1.1 安装依赖

确保你已经安装了 `electron` 和 `electron-builder`。然后安装 `electron-updater`：

```bash
npm install electron-updater --save
```

:::tip
注意：electron-updater 是 electron-builder 的一部分，通常不需要单独安装，但显式安装可以确保版本兼容。
:::

```js
const { app, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

// 检查更新
function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
}

// 监听更新事件
autoUpdater.on('error', (error) => {
  console.error('更新出错:', error.message);
  dialog.showErrorBox('更新错误', error.message);
});

autoUpdater.on('checking-for-update', () => {
  console.log('正在检查更新...');
});

autoUpdater.on('update-available', (info) => {
  console.log('发现新版本:', info);
  dialog.showMessageBox({
    type: 'info',
    title: '发现新版本',
    message: '新版本已开始下载，您可以在后台静默更新。',
    buttons: ['确定'],
  });
});

autoUpdater.on('update-not-available', (info) => {
  console.log('当前已是最新版本:', info);
});

autoUpdater.on('download-progress', (progressObj) => {
  console.log(`下载进度: ${progressObj.percent}%`);
  // 可通过 IPC 发送进度到渲染进程
});

autoUpdater.on('update-downloaded', (info) => {
  dialog
    .showMessageBox({
      title: '更新已下载',
      message: '新版本已下载完成，是否立即重启并安装更新？',
      buttons: ['立即重启', '稍后'],
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});

// 应用就绪后检查更新
app.whenReady().then(() => {
  checkForUpdates();
});
```

配置服务器地址

```
"publish": {
  "provider": "generic",
  "url": "https://your-server.com/updates"
}
```
