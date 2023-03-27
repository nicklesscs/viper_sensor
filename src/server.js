const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const PORT = 8080;
const IP_ADDRESS = '130.215.175.244';

fs.readFile('./gui.html', function (err, html) {
  if (err) throw err;

  const server = http.createServer(function(request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('Client has connected');

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    ws.on('close', () => {
      console.log('Client has disconnected');
    });
  });

  server.listen(PORT, IP_ADDRESS, function () {
    console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
  });
});
