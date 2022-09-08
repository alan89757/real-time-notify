const WebSocket = require('ws');
const events = [];
let lastestTimestamp = Date.now();
const clients = new Set();

const EventProducer = ()=> {
  const event = {
    id: Date.now(),
    timestamp: Date.now()
  }
  events.push(event);
  lastestTimestamp = event.timestamp;

  clients.forEach(client=> {
    client.ws.send(JSON.stringify(events.filter(event=>event.timestamp > client.timestamp)));
    client.timestamp = lastestTimestamp;
  })
}

setInterval(() => {
  EventProducer();
}, 3000);

const wss = new WebSocket.Server({port: 8080})

wss.on('connection', (ws, req)=> {
  console.log('client connected');
  ws.send(JSON.stringify(events))
  const client = {
    timestamp: lastestTimestamp,
    ws
  }
  ws.on('close', _=> {
    clients.delete(client);
  })
})