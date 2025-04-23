const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let browserSocket = null;
let deviceSocket = null;

wss.on('connection', (ws, req) => {
  console.log("New connection");

  ws.on('message', (msg) => {
    if (msg === 'BROWSER') {
      browserSocket = ws;
      console.log("Browser connected");
    } else if (msg === 'DEVICE') {
      deviceSocket = ws;
      console.log("ESP32 device connected");
    } else if (ws === deviceSocket && browserSocket) {
      browserSocket.send(msg);  // Forward sensor data to browser
    }
  });

  ws.on('close', () => {
    if (ws === browserSocket) browserSocket = null;
    if (ws === deviceSocket) deviceSocket = null;
  });
});

server.listen(8765, () => console.log('Relay running on port 8765'));
