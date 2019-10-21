const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
let login = require("./server/login/login.js");
let game = require("./server/game/game.js");
let database = require("./server/game/database.js");

//--------------------------------------
const connect = () => {
  sock = io(socketUrl, {
    autoConnect: false,
  });
};

app.use(express.static(`client`));
console.log('started');
const server = http.createServer(app);
const io = socketio(server);
console.log('running')


io.on('connection', (sock) => {
  io.emit('console', login.console('Join: ' + sock.id, sock))


  sock.on('searchbar',(data)=>{
    database.Search(data,sock)
  })

  sock.on('trending-now', (data) => {
    database.Trending(sock)
  });

  sock.on('homepage-query(send)specific', (data) => {
    database.homepageQuerySpecific(sock,data)
  });
  

  sock.on('homepage-query(send)', (data) => {
    database.homepageQuery(sock)
  });

  //Game code
  //Create New game
  sock.on('game-creation', (mongoId) => {
    let state = game.newGame(sock, mongoId, io);
  });

  //start Game currently does nothing
  sock.on('start', (state) => {
    let id = game.ChangeState((sock, state, io))
    io.in(id).emit('start', 'state');
  });

  //question answers does nothing
  sock.on('question-answer', (state) => {
    let gameAnswer = game.Answer(sock.id, sock, io)
    io.in(gameAnswer[1]).emit('answer', gameAnswer[0]);
  });


  sock.on('answer', (state) => {
    let answered = game.Answered(sock.id, sock, io, state)
    io.to(answered[1]).emit('answerScore', answered);
  });

  //game requests
  sock.on('request', (text) => {
    let join = login.newRequest(sock, text, io);
    if (!join[0]) {
      sock.emit('requests-recieve', 'nope')
    } else {
      sock.emit('requests-recieve', 'yep')
    }
  });
  //Disconnection-------------------------------
  sock.on('disconnect', function() {
    login.disconnect(sock, io);
  });
  //---------------------------------------------
});
server.on('error', (err) => {
  console.error('Server error:', err);
});
server.listen(8080, () => {
  console.log('RPS started on 8080');
});