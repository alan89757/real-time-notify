const http = require('http')
const url = require('url')

const events = []
const clients = new Set()
let latestTimestamp = Date.now()

const headers = {
  // 告诉HTTP连接，它是一个event-stream的请求
  'Content-Type': 'text/event-stream',
  // 保持HTTP连接不断开
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  "Origin": '*'
}

const EventProducer = () => {
  const event = {
    id: Date.now(),
    timestamp: Date.now()
  }
  events.push(event)
  latestTimestamp = event.timestamp

  clients.forEach(client => {
    client.resp.write(`id: ${(new Date()).toLocaleTimeString()}\n`)
    // 后面的两个\n\n一定要有，可以理解为服务端先客户端推送信息的特殊格式
    client.resp.write(`data: ${JSON.stringify(events.filter(event => event.timestamp > client.timestamp))}\n\n`)
    client.timestamp = latestTimestamp
  })
}

// 每5秒生成一个新的事件
setInterval(() => {
  EventProducer()
}, 5000)

const server = http.createServer((req, resp) => {
  const urlParsed = url.parse(req.url, true)

  if (urlParsed.pathname == '/subscribe') {
    resp.writeHead(200, headers)
    
    // 发送现存事件
    resp.write(`id: ${(new Date()).toLocaleTimeString()}\n`)
    resp.write(`data: ${JSON.stringify(events)}\n\n`)
   
    const client = {
      timestamp: latestTimestamp,
      resp
    }
    
    clients.add(client)
    req.on('close', () => {
      clients.delete(client)
    })
  }
})

server.listen(8080, () => {
  console.log('server is up')
})