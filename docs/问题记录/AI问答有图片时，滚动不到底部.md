## 问题描述

**AI Chat 在点击历史记录的时候，需要将聊天记录转换成 markdown 格式展示出来，但是当聊天记录中包含图片的时候，滚动不到底部。**

- 为什么会出现这种情况呢？
  核心原因在于图片的加载是异步的：当你加载历史记录并触发“滚动到底部”的逻辑时，图片可能还没有下载完成，浏览器无法计算其真实高度，导致滚动位置计算偏短，最终停留在距离底部一段空白的位置。

- 为什么使用 nextTick 也没有解决问题？
  因为 nextTick 是在 DOM 更新完成后执行的，而图片的加载是异步的，所以 nextTick 无法等待图片加载完成。当你调用 nextTick 时，它仅仅是在告诉你：“Vue 已经把 HTML 标签img插入到页面里了”。但是，图片的内容 高度 可能还没有下载下来。

## 解决方案

1、加载历史记录数据，渲染到页面。
2、检测消息列表中是否包含图片。
3、如果有图片，使用 Promise.all 等待所有 img 标签的 onload 事件触发。
4、所有图片加载完成后，再次执行滚动到底部的方法。

```js
const scrollToBottom = async () => {
  await nextTick(); // 等待 DOM 更新

  if (chatRef.value) {
    // 等待图片加载完成，否则滚动不到底部
    const images = chatRef.value.querySelectorAll('img');
    const imagePromises = Array.from(images).map((img) => {
      // 图片已加载完成
      if (img.complete) return Promise.resolve();
      // 等待图片加载
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // 加载失败也继续
      });
    });
    await Promise.race([
      Promise.all(imagePromises),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);

    chatRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
};
```
