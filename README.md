# 实时更新数据
> 短轮询(polling)

> 长轮询(long polling)

> 长连接(WebSocket)

> 服务器事件推送(Sever-Sent Events, aka SSE)】

| sse | websocket |
|    ---   | --- |
| http 协议 | 独立的 websocket 协议 |
| 轻量，使用简单 | 相对复杂 |
| 默认支持断线重连 | 需要自己实现断线重连 |
| 文本传输 | 二进制传输 |
| 支持自定义发送的消息类型 | - |



### 参考文档
<!-- [都2022年了，实时更新数据你还只会用短轮询?](https://juejin.cn/post/7139684620777291807) -->