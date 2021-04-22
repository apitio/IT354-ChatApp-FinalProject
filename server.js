const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3030 });

const express = require('express');
const app = express();

app.use(express.static('frontend/build'));

const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
console.log('server started on port:',PORT);
app.listen(PORT);


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
        
      }
    });
  });
});