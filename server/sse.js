const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const events = []; // 存储事件
const clients = new Set(); // 存储客户端的请求
let latestTimestamp = Date.now();

const headers = {
  'Content-type': 'text/event-stream',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
}

const EventProducer = () => {
  console.log(111)
  const event = {
    id: Date.now(),
    timestamp: Date.now(),
  }
  events.push(event);
  latestTimestamp = event.timestamp;
  clients.forEach(client => {
    console.log('client---', client.res);
    client.res.write(`id: ${(new Date()).toLocaleTimeString()}\n`);
    client.res.write(`data: ${JSON.stringify(events.filter(event=>event.timestamp > client.timestamp))}\n\n`);
    client.timestamp = latestTimestamp;
  });

}

setInterval(() => {
  EventProducer();
}, 5000);

app.get('/subscribe', function (req, res) {
  res.header(headers);
  res.write(`id:${(new Date()).toLocaleTimeString()}\n`);
  res.write(`data:${JSON.stringify(events)}\n\n`);
  // setInterval(() => {
  //   res.write(`data: ${(new Date()).toLocaleTimeString()}\n\n`);
  // }, 2000);

  const client = {
    timestamp: latestTimestamp,
    res
  }
  clients.add(client);
  req.on('close', () => {
    clients.delete(client);
  })

});

app.listen(8080, () => {
  console.log('Server is up');
})