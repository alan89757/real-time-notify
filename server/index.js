// 验证多个请求会不会阻塞
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/a', async function(req, res){
  console.log('params--', req.query)
  const { version } = req.query; 
  if(version) {
    res.send(`hello ${version}`);
  } else {
    return new Promise((resolve, reject)=> {
      setTimeout(() => {
        resolve('ok')
      }, 30000);
    }).then((data)=> {
      res.send('hello a');
    })
  }
})

app.get('/b', function(req, res){
  res.send('hello b');
})

app.listen(8000, function() {
  console.log('Server is up')
})