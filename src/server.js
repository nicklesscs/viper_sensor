// Import required modules
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

// Create HTTP server
const server = http.createServer((request, response) => {
  fs.readFile('./gui.html', (err, html) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    response.writeHeader(500, {"Content-Type": "text/plain"});
    response.write("500 Internal Server Error");
    response.end();
  } else {
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
  }
});

});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client has connected');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`received: ${message}`);

  // Check if the message is of type 'tf_polhemus'
  try {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === 'tf_polhemus') {
      // Call sendTfPolhemusDataToClient function with the data
      sendTfPolhemusDataToClient(parsedMessage.data);
    }
  } catch (e) {
    console.error(`Error parsing message: ${e}`);
  }
});

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});



// Listen for connections on the server
server.listen(8080, () => {
  console.log('Server running at http://130.215.120.242:8080/');
});

function sendTfPolhemusDataToClient(data) {
  // Convert data to JSON string
  const jsonString = JSON.stringify({ type: 'tf_polhemus', data });

  // Log the jsonString to the console
  console.log('Sending tf_polhemus message:', jsonString);

  // Send data to all connected WebSocket clients
  wss.clients.forEach((client) => {

    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonString);
      console.log('message sent');
    }
  });
}

