## 问题描述
在H5中使用fetchEventSource流式接口，然后切换后台再次进来，会导致重复调用接口问题。同时生成两次记录。

## 原因
当用户将包含SSE连接的请求切换到后台时，现代浏览器为了优化性能和节省资源，会降低非活动标签页的优先级，就会导致用户切换页面后会中断连接，重新回到页面后就会自动重连

## 解决
**在初始化fetch-event-source时将openWhenHidden值设置为true**

openWhenHidden: true 是 @microsoft/fetch-event-source 库中的一个重要配置选项，它的作用是：

- 配置作用 ：
当设置为 true 时，即使浏览器标签页处于不可见状态（用户切换到其他标签页或最小化窗口），fetchEventSource 仍然会尝试建立和维护与服务器的 SSE（Server-Sent Events）连接。
- 默认行为 ：
如果不设置这个选项，当标签页不可见时，浏览器通常会暂停或限制后台连接以节省资源和网络带宽，这可能导致 SSE 连接断开。
