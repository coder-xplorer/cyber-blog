## 使用 Fetch 实现流式数据请求

```
核心逻辑：
  利用 AbortController 创建中断信号，关联请求以支持随时取消；在接收到后端流式响应后，通过 response.body.getReader()获取可读流读取器，配合 TextDecoder 逐块解码二进制数据；通过递归调用 reader.read()持续读取分块数据，每获取一块就通过 onMessage 回调实时传递给外部；
```

```
可读流读取器：
  response.body.getReader() 是浏览器 Streams API 中的核心方法，用于创建一个可读流读取器（ReadableStreamDefaultReader），专门用于逐步处理 HTTP 响应中的流式数据（如服务器分块返回的内容）。
  核心作用
  从 Response.body（一个 ReadableStream 对象）中获取一个读取器，用于逐步、逐个读取流中的数据块。
  支持流式处理大型响应体或流式响应（如 AI 生成内容、实时日志、聊天消息流等），无需需等待整个响应完成即可就能分步处理数据。
  工作机制
  获取读取器：const reader = response.body.getReader() 会锁定流，确保只有该读取器能读取数据（直到流结束或主动释放）。
  读取数据块：通过 reader.read() 异步读取流中的下一个数据块，返回一个 Promise， resolve 结果为一个对象 { done, value }：
  done：布尔值，true 表示流已结束，false 表示还有后续数据。
  value：当前读取到的二进制数据（Uint8Array 类型），需通过 TextDecoder 转换为字符串。
  递归读取：在流式场景中，通常通过递归调用 reader.read() 持续获取数据，直到 done 为 true。
```

```js
/**
 * 流式聊天消息接口
 * @param query 查询内容
 * @param inputs 输入参数
 * @param files 文件列表
 * @param conversationId 会话ID
 * @param onMessage 消息回调函数
 * @param onError 错误回调函数
 * @returns 取消函数
 */
export const streamChatMessage = (
  query: string,
  inputs: Record<string, any>,
  files: Array<{
    type: string,
    transfer_method: string,
    upload_file_id?: string,
    url: string,
  }>,
  conversationId: string = '',
  onMessage: (data: string) => void,
  onError?: (error: Error) => void
): (() => void) => {
  const controller = new AbortController();
  const signal = controller.signal;

  fetch('http://your_api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer your_token',
    },
    body: JSON.stringify({
      inputs,
      query,
      response_mode: 'streaming',
      conversation_id: conversationId,
      user: USER_ID,
      files,
    }),
    signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      function processStream(): any {
        return reader.read().then(({ done, value }) => {
          if (done) {
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          onMessage(chunk);

          return processStream();
        });
      }

      return processStream();
    })
    .catch((error) => {
      if (onError) {
        onError(error);
      } else {
        console.error('Stream error:', error);
      }
    });

  // 返回取消函数
  return () => {
    controller.abort();
  };
};
```
