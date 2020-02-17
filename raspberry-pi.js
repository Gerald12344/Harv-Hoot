const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();

app.use(express.static(`../Harv-hoot`));
console.log('started');
const server = http.createServer(app);
const io = socketio(server);
console.log('running')


server.on('error', (err) => {
    console.error('Server error:', err);
  });
  server.listen(8000, () => {
    console.log('RPS started on 8000');
  });