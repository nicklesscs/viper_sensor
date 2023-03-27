const WebSocket = require('ws');

const socket = new WebSocket('ws://130.215.175.244:8080/');

socket.on('open', function() {
  console.log('WebSocket connection established!');
});

socket.on('message', function(data) {
  console.log('Received message:', data);
});

socket.on('close', function() {
  console.log('WebSocket connection closed!');
});
