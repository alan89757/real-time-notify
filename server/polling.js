// node/polling.js

const http = require('http')
const url = require('url')

// 时间列表
const events = []
// 最新生成的事件时间
let latestTimestamp = 0

// 事件生产者
const EventProducer = () => {
  const event = {
    id: Date.now(),
    timestamp: Date.now()
  }
  events.push(event)
  latestTimestamp = event.timestamp
}

// 每隔5秒生成一个新的事件
setInterval(() => {
  EventProducer()
}, 5000)

const server = http.createServer((req, resp) => {
  const urlParsed = url.parse(req.url, true)

  resp.setHeader('Access-Control-Allow-Origin', '*')
  resp.setHeader('Origin', '*')

  if (urlParsed.pathname == '/events') {
    // 每次客户端都带上它最后拿到的事件时间戳来获取新的事件
    const timestamp = parseInt(urlParsed.query['timestamp'])
    // 判断客户端是否拿到最新事件
    if (timestamp < latestTimestamp) {
      // 将所有没发送过给这个客户端的事件一次性发送出去
      resp.write(JSON.stringify(events.filter(event => event.timestamp > timestamp)))
    }
    resp.end()
  }
})

server.listen(9090, () => {
  console.log('server is up')
})